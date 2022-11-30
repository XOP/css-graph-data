import { GraphSize, GraphSelectors, GraphDeclarations, GraphCommon } from '.';

import { DataProvider } from '../data/Data';

export default () => (
  <DataProvider>
    <GraphSize />
    <GraphSelectors />
    <GraphDeclarations />
    <GraphCommon />
  </DataProvider>
);
