import { createSignal, createEffect, onCleanup } from 'solid-js';

import * as Plot from '@observablehq/plot';

import { plotOptions } from './plot-options';
import { Segment } from '../atoms';
import { useData, useControls } from '../providers';
import { COLORS, DIM_COMMON_LINES } from '../../utils/globals';

const Graph = () => {
  const data = useData();
  const { amount } = useControls();

  let plotRef;

  const [plotCommonY, setPlotCommonY] = createSignal(DIM_COMMON_LINES);

  createEffect(() => {
    if (data.loading) return;

    const refinedData = data().slice(0, amount());

    const marks = [
      Plot.dot(refinedData, {
        x: 'timestamp',
        y: plotCommonY(),
        fill: plotCommonY(),
        title: 'version',
        r: 8,
        stroke: COLORS.light,
      }),
      Plot.ruleY([0]),
      Plot.linearRegressionY(refinedData, {
        x: 'timestamp',
        y: plotCommonY(),
        stroke: COLORS.accent,
      }),
    ];

    const plot = Plot.plot({
      ...plotOptions,
      y: {
        label: plotCommonY() === DIM_COMMON_LINES ? 'Lines' : 'Rules',
        domain:
          plotCommonY() === DIM_COMMON_LINES ? [3000, 10500] : [500, 2500],
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

const GraphCommon = () => {
  return (
    <Segment title="Common data">
      <Graph />
    </Segment>
  );
};

export default GraphCommon;