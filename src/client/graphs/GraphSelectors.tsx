import { createSignal, createEffect, onCleanup } from 'solid-js';

import * as Plot from '@observablehq/plot';

import { plotOptions } from './plot-options';
import GraphSkeleton from './GraphSkeleton';
import { Choose, Segment } from '../atoms';
import { useData, useControls } from '../providers';
import ls from '../storage';

import {
  COLORS,
  DIM_SELECTORS_AVG,
  DIM_SELECTORS_SUM,
} from '../../utils/globals';

const [storage, setStorage] = ls;
const plotKey = 'plotSelectorsVariant';

const GraphSelectors = () => {
  const data = useData();
  const { amount } = useControls();

  const [isReady, setReady] = createSignal(false);

  let plotRef;

  const [plotSelectorsY, setPlotSelectorsY] = createSignal(
    storage[plotKey] || DIM_SELECTORS_AVG
  );

  const selectorsValues = [
    { value: DIM_SELECTORS_AVG, label: 'Average' },
    { value: DIM_SELECTORS_SUM, label: 'Total' },
  ];

  createEffect(() => {
    if (data.loading) return;

    setReady(true);

    const refinedData = data().slice(0, amount());

    const marks = [
      Plot.dot(refinedData, {
        x: 'timestamp',
        y: plotSelectorsY(),
        fill: plotSelectorsY(),
        title: 'version',
        r: 8,
        stroke: COLORS.light,
      }),
      Plot.ruleY([0]),
      Plot.linearRegressionY(refinedData, {
        x: 'timestamp',
        y: plotSelectorsY(),
        stroke: COLORS.accent,
      }),
    ];

    const plot = Plot.plot({
      ...plotOptions,
      y: {
        label: 'Selectors',
        domain: [1, plotSelectorsY() === DIM_SELECTORS_SUM ? 6000 : 3],
      },
      marks,
    });

    plot.remove();
    plotRef.append(plot);

    onCleanup(() => {
      plot.remove();
    });
  });

  const Graph = () => (
    <GraphSkeleton isReady={isReady}>
      <div ref={plotRef}></div>
    </GraphSkeleton>
  );

  const onControlChange = (val) => {
    setPlotSelectorsY(val);
    setStorage(plotKey, val);
  };

  const controls = (
    <Choose
      value={plotSelectorsY}
      values={selectorsValues}
      onChange={onControlChange}
    />
  );

  return (
    <Segment title="Selectors data" controls={controls}>
      <Graph />
    </Segment>
  );
};

export default GraphSelectors;
