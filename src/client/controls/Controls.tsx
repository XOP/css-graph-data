import { createSignal } from 'solid-js';

import { Box, Choose, Range } from '../atoms';
import { useControls } from '../providers';

import styles from './controls.module.css';

const Controls = () => {
  const { amount, setAmount, isGrid, setIsGrid } = useControls();
  const [amountValue, setAmountValue] = createSignal(amount());
  const [isGridValue, setIsGridValue] = createSignal(isGrid());

  const layoutValues = [
    {
      value: false,
      label: 'List',
    },
    {
      value: true,
      label: 'Grid',
    },
  ];

  const handleAmountChange = (nextValue) => {
    setAmount(nextValue);
  };

  const handleLayoutChange = (nextLayout) => {
    setIsGridValue(nextLayout);
  };

  return (
    <Box classList={{ [styles.controls]: true }}>
      <div class={styles.range}>
        <Range
          init={amountValue()}
          min={5}
          max={200}
          onChange={handleAmountChange}
        />
      </div>
      <div class={styles.choose}>
        <Choose
          value={isGridValue}
          values={layoutValues}
          onChange={handleLayoutChange}
        ></Choose>
      </div>
    </Box>
  );
};

export default Controls;
