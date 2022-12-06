import { createSignal, createEffect, onCleanup } from 'solid-js';

import * as Plot from '@observablehq/plot';

import { plotOptions } from './plot-options';
import GraphSkeleton from './GraphSkeleton';
import { Choose, Segment } from '../atoms';
import { useData, useControls } from '../providers';
import { COLORS, DIM_SIZE, DIM_SIZE_GZIP } from '../../utils/globals';

const GraphSize = () => {
  const data = useData();
  const { amount } = useControls();

  const [isReady, setReady] = createSignal(false);

  let plotRef;

  const [plotSizeY, setPlotSizeY] = createSignal(DIM_SIZE);

  const sizeValues = [
    { value: DIM_SIZE, label: 'Regular' },
    { value: DIM_SIZE_GZIP, label: 'Gzipped' },
  ];

  createEffect(() => {
    if (data.loading) return;

    setReady(true);

    const refinedData = data().slice(0, amount());

    const marks = [
      Plot.dot(refinedData, {
        x: 'timestamp',
        y: plotSizeY(),
        fill: plotSizeY(),
        title: 'version',
        r: 8,
        stroke: COLORS.light,
      }),
      Plot.ruleY([0]),
      Plot.linearRegressionY(refinedData, {
        x: 'timestamp',
        y: plotSizeY(),
        stroke: COLORS.accent,
      }),
    ];

    const plot = Plot.plot({
      ...plotOptions,
      y: {
        label: 'Size, kB',
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

  const Graph = () => (
    <GraphSkeleton isReady={isReady}>
      <div ref={plotRef}></div>
    </GraphSkeleton>
  );

  const controls = (
    <Choose value={plotSizeY} values={sizeValues} onChange={setPlotSizeY} />
  );

  return (
    <Segment title="CSS Size" controls={controls}>
      <Graph />
    </Segment>
  );
};

export default GraphSize;
