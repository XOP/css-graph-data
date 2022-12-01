import { createSignal, createEffect, onCleanup } from 'solid-js';

import * as Plot from '@observablehq/plot';

import { plotOptions } from './plot-options';
import { Segment } from '../atoms';
import { useData, useControls } from '../providers';
import { COLORS, DIM_DECL_AMOUNT } from '../../utils/globals';

const Graph = () => {
  const data = useData();
  const { amount } = useControls();

  let plotRef;

  const [plotDeclarationsY, setPlotDeclarationsY] =
    createSignal(DIM_DECL_AMOUNT);

  createEffect(() => {
    if (data.loading) return;

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

  return <div ref={plotRef}></div>;
};

const GraphDeclarations = () => {
  return (
    <Segment title="Declarations data">
      <Graph />
    </Segment>
  );
};

export default GraphDeclarations;
