import { ParentProps } from 'solid-js';
import type { JSX } from 'solid-js';

import { Box } from '../';

import styles from './segment.module.css';

export interface ISegment {
  title: string | JSX.Element;
  controls?: JSX.Element;
}

const Segment = ({ title, controls, children }: ISegment & ParentProps) => {
  return (
    <Box classList={{[styles.section]: true}}>
      <h1>{title}</h1>
      {controls && <aside class={styles.controls}>{controls}</aside>}
      <div class={styles.graph}>{children}</div>
    </Box>
  );
};

export default Segment;
