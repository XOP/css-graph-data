import { ParentProps } from 'solid-js';

import styles from './box.module.css';

const Box = ({
  children,
  classList = {},
  ...rest
}: ParentProps & { classList?: object }) => {
  return (
    <div classList={{ [styles.box]: true, ...classList }} {...rest}>
      {children}
    </div>
  );
};

export default Box;
