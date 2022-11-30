import { ParentProps } from 'solid-js';
import type { JSX } from 'solid-js';

import styles from './segment.module.css';

interface SegmentType {
  title: string | JSX.Element;
  controls?: JSX.Element;
}

const Segment = ({ title, controls, children }: SegmentType & ParentProps) => {
  return (
    <section class={styles.section}>
      <h1>{title}</h1>
      {controls && <aside class={styles.controls}>{controls}</aside>}
      <div class={styles.graph}>{children}</div>
    </section>
  );
};

export default Segment;
