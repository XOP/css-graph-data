import { createSignal, createEffect, onCleanup } from 'solid-js';

import * as Plot from '@observablehq/plot';

import { plotOptions } from './plot-options';
import { Choose, Segment } from '../atoms';
import { useData, useControls } from '../providers';

import {
  COLORS,
  DIM_SELECTORS_AVG,
  DIM_SELECTORS_SUM,
} from '../../utils/globals';

const GraphSelectors = () => {
  const data = useData();
  const { amount } = useControls();

  let plotRef;

  const [plotSelectorsY, setPlotSelectorsY] = createSignal(DIM_SELECTORS_AVG);

  const selectorsValues = [
    { value: DIM_SELECTORS_AVG, label: 'Average' },
    { value: DIM_SELECTORS_SUM, label: 'Total' },
  ];

  createEffect(() => {
    if (data.loading) return;

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

  const Graph = () => <div ref={plotRef}></div>;

  const controls = (
    <Choose
      value={plotSelectorsY}
      values={selectorsValues}
      onChange={setPlotSelectorsY}
    />
  );

  return (
    <Segment title="Selectors data" controls={controls}>
      <Graph />
    </Segment>
  );
};

export default GraphSelectors;
