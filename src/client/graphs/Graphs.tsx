import { GraphSize, GraphSelectors, GraphDeclarations, GraphCommon } from '.';
import Controls from '../controls/Controls';

import { DataProvider, ControlsProvider } from '../providers';

export default () => (
  <ControlsProvider>
    <DataProvider>
      <Controls />
      <GraphSize />
      <GraphSelectors />
      <GraphDeclarations />
      <GraphCommon />
    </DataProvider>
  </ControlsProvider>
);
