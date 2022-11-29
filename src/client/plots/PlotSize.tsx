import { Graph, useData } from '..';

const Plot = () => {
  const data = useData();

  return <pre>{JSON.stringify(data(), null, 2)}</pre>;
};

const PlotSize = () => {
  return (
    <Graph title="CSS Size">
      <Plot />
    </Graph>
  );
};

export default PlotSize;
