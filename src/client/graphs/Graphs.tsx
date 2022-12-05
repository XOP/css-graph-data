import GraphsLayout from './GraphsLayout';

import { DataProvider, ControlsProvider } from '../providers';

export default () => (
  <ControlsProvider>
    <DataProvider>
      <GraphsLayout />
    </DataProvider>
  </ControlsProvider>
);
