import { Skeleton } from '../atoms';

import styles from './graph-skeleton.module.css';

const GraphSkeleton = () => (
  <Skeleton classList={{ [styles.skeleton]: true }} />
);

export default GraphSkeleton;
