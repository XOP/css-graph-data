import { createSignal, createEffect, onCleanup } from 'solid-js';

import * as Plot from '@observablehq/plot';

import { plotOptions } from './plot-options';
import { Segment, useData } from '..';

import { COLORS, DIM_SIZE } from '../../utils/globals';

const Graph = () => {
  const data = useData();

  let plotRef;

  const [plotSizeY, setPlotSizeY] = createSignal(DIM_SIZE);

  createEffect(() => {
    if (data.loading) return;

    const marks = [
      Plot.dot(data(), {
        x: 'timestamp',
        y: plotSizeY(),
        fill: plotSizeY(),
        title: 'version',
        r: 8,
        stroke: COLORS.light,
      }),
      Plot.ruleY([0]),
      Plot.linearRegressionY(data(), {
        x: 'timestamp',
        y: plotSizeY(),
        stroke: COLORS.accent,
      }),
    ];

    const plot = Plot.plot({
      ...plotOptions,
      y: {
        label: 'Size, kb',
        domain: [0, plotSizeY() === DIM_SIZE ? 350 : 50],
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

const GraphSize = () => {
  return (
    <Segment title="CSS Size">
      <Graph />
    </Segment>
  );
};

export default GraphSize;
