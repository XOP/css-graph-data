/** @jsxImportSource solid-js */

import { Accessor, ParentProps, Show } from 'solid-js';

import { Skeleton } from '../atoms';

import styles from './graph-skeleton.module.css';

const GraphSkeleton = ({
  isReady,
  children,
}: { isReady: Accessor<boolean> } & ParentProps) => (
  <Show
    fallback={<Skeleton classList={{ [styles.skeleton]: true }} />}
    when={isReady()}
  >
    {children}
  </Show>
);

export default GraphSkeleton;
