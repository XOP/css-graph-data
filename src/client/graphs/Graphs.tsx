import { GraphSize, GraphSelectors, GraphDeclarations, GraphCommon } from '.';

import { ControlsProvider } from '../controls/Controls';
import { DataProvider } from '../data/Data';

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
