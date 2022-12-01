import { GraphSize, GraphSelectors, GraphDeclarations, GraphCommon } from '.';

import { DataProvider, ControlsProvider } from '../providers';

export default () => (
  <ControlsProvider>
    <DataProvider>
      <GraphSize />
      <GraphSelectors />
      <GraphDeclarations />
      <GraphCommon />
    </DataProvider>
  </ControlsProvider>
);
