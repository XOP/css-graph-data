import { createSignal, createEffect, onCleanup } from 'solid-js';

import * as Plot from '@observablehq/plot';

import { plotOptions } from './plot-options';
import GraphSkeleton from './GraphSkeleton';
import { Choose, Segment } from '../atoms';
import { useData, useControls } from '../providers';

import ls from '../storage';

import {
  COLORS,
  DIM_DECL_AMOUNT,
  DIM_DECL_COHESION,
} from '../../utils/globals';

const [storage, setStorage] = ls;
const plotKey = 'plotDeclarationsVariant';

const GraphDeclarations = () => {
  const data = useData();
  const { amount } = useControls();

  const [isReady, setReady] = createSignal(false);

  let plotRef;

  const [plotDeclarationsY, setPlotDeclarationsY] =
    createSignal(storage[plotKey] || DIM_DECL_AMOUNT);

  const declarationsValues = [
    { value: DIM_DECL_AMOUNT, label: 'Amount' },
    { value: DIM_DECL_COHESION, label: 'Cohesion' },
  ];

  createEffect(() => {
    if (data.loading) return;

    setReady(true);

    const refinedData = data().slice(0, amount());

    const marks = [
      Plot.dot(refinedData, {
        x: 'timestamp',
        y: plotDeclarationsY(),
        fill: plotDeclarationsY(),
        title: 'version',
        r: 8,
        stroke: COLORS.light,
      }),
      Plot.ruleY([0]),
      Plot.linearRegressionY(refinedData, {
        x: 'timestamp',
        y: plotDeclarationsY(),
        stroke: COLORS.accent,
      }),
    ];

    const plot = Plot.plot({
      ...plotOptions,
      y: {
        label:
          plotDeclarationsY() === DIM_DECL_AMOUNT ? 'Declarations' : 'Cohesion',
        domain:
          plotDeclarationsY() === DIM_DECL_AMOUNT ? [3000, 9000] : [2.5, 5],
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
    setPlotDeclarationsY(val);
    setStorage(plotKey, val);
  }

  const controls = (
    <Choose
      value={plotDeclarationsY}
      values={declarationsValues}
      onChange={onControlChange}
    />
  );

  return (
    <Segment title="Declarations data" controls={controls}>
      <Graph />
    </Segment>
  );
};

export default GraphDeclarations;
