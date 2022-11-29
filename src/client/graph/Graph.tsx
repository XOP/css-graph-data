import { ParentProps } from 'solid-js';
import type { JSX } from 'solid-js';

import styles from './graph.module.css';

interface GraphType {
  title: string | JSX.Element;
  controls?: JSX.Element;
}

const Graph = ({ title, controls, children }: GraphType & ParentProps) => {
  return (
    <section class={styles.section}>
      <h1>{title}</h1>
      {controls && <aside class={styles.controls}>{controls}</aside>}
      <div class={styles.plot}>{children}</div>
    </section>
  );
};

export default Graph;
