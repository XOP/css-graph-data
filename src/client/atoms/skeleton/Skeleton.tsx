import { ComponentProps, JSX } from 'solid-js';

import styles from './skeleton.module.css';

interface ISkeleton {
  width?: string;
  height?: string;
}

const Skeleton = (props: ISkeleton & ComponentProps<'div'>) => {
  const { width, height, classList, style, ...rest } = props;

  return (
    <div
      classList={{ [styles.skeleton]: true, ...classList }}
      style={{ width, height, ...(style as JSX.CSSProperties) }}
      {...rest}
    ></div>
  );
};

export default Skeleton;
