import {
  createContext,
  createSignal,
  createResource,
  Resource,
  useContext,
} from 'solid-js';

import { matchSorter } from 'match-sorter';

import { CssDataType } from '../../../pages/data.json';

const fetchData = async function () {
  const res = await fetch('/data.json');
  const _ = await res.json();

  let dataSet: CssDataType[] = [];

  dataSet = matchSorter(_, '', { keys: ['timestamp'] });
  dataSet.reverse();
  dataSet = dataSet.map((d: CssDataType) => {
    return {
      ...d,
      size: +d.size / 1024,
      sizeGzip: +d.sizeGzip / 1024,
      timestamp: new Date(+d.timestamp),
    };
  });

  return dataSet;
};

const DataContext = createContext<Resource<CssDataType[]>>(null);

export const DataProvider = (props) => {
  const [_, setData] = createSignal([]);
  const [data] = createResource(_, fetchData);

  return <DataContext.Provider value={data} children={props.children} />;
};

export const useData = () => useContext(DataContext);
