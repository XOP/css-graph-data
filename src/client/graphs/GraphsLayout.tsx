import { createEffect, createSignal, on } from 'solid-js';

import { GraphSize, GraphSelectors, GraphDeclarations, GraphCommon } from '.';
import Controls from '../controls/Controls';

import { useControls } from '../providers';

import styles from './graphs-layout.module.css';

export default () => {
  const { isGrid } = useControls();

  return (
    <div class={styles.root}>
      <aside class={styles.controls}>
        <Controls />
      </aside>

      <div classList={{ [styles.layout]: true, [styles.isGrid]: isGrid() }}>
        <GraphSize />
        <GraphSelectors />
        <GraphDeclarations />
        <GraphCommon />
      </div>
    </div>
  );
};
