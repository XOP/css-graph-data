import { createSignal, createEffect, onCleanup } from 'solid-js';

import * as Plot from '@observablehq/plot';

import { plotOptions } from './plot-options';
import { Segment, useData } from '..';

import { COLORS, DIM_COMMON_LINES } from '../../utils/globals';

const Graph = () => {
  const data = useData();

  let plotRef;

  const [plotCommonY, setPlotCommonY] = createSignal(DIM_COMMON_LINES);

  createEffect(() => {
    if (data.loading) return;

    const marks = [
      Plot.dot(data(), {
        x: 'timestamp',
        y: plotCommonY(),
        fill: plotCommonY(),
        title: 'version',
        r: 8,
        stroke: COLORS.light,
      }),
      Plot.ruleY([0]),
      Plot.linearRegressionY(data(), {
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
