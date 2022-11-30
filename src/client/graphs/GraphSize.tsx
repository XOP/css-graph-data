import { createSignal, createEffect, onCleanup } from 'solid-js';

import * as Plot from '@observablehq/plot';

import { plotOptions } from './plot-options';
import { Segment, useData } from '..';

import {
  COLORS,
  DIM_SELECTORS_AVG,
  DIM_SELECTORS_SUM,
} from '../../utils/globals';

const Graph = () => {
  const data = useData();

  let plotSelectorsRef;

  const [plotSelectorsY, setPlotSelectorsY] = createSignal(DIM_SELECTORS_AVG);

  createEffect(() => {
    if (data.loading) return;

    const marks = [
      Plot.dot(data(), {
        x: 'timestamp',
        y: plotSelectorsY(),
        fill: plotSelectorsY(),
        title: 'version',
        r: 8,
        stroke: COLORS.light,
      }),
      Plot.ruleY([0]),
      Plot.linearRegressionY(data(), {
        x: 'timestamp',
        y: plotSelectorsY(),
        stroke: COLORS.accent,
      }),
    ];

    const plot = Plot.plot({
      ...plotOptions,
      y: {
        label: 'Selectors',
        domain: [1, plotSelectorsY() === DIM_SELECTORS_SUM ? 5000 : 3],
      },
      marks,
    });

    plot.remove();
    plotSelectorsRef.append(plot);

    onCleanup(() => {
      plot.remove();
    });
  });

  return <div ref={plotSelectorsRef}></div>;
};

const GraphSize = () => {
  return (
    <Segment title="CSS Size">
      <Graph />
    </Segment>
  );
};

export default GraphSize;
