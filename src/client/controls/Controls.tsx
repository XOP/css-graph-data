import { createSignal } from 'solid-js';

import { Box, Range } from '../atoms';
import { useControls } from '../providers';

const Controls = () => {
  const { amount, setAmount } = useControls();
  const [value, setValue] = createSignal(amount());

  const handleAmountChange = (nextValue) => {
    setAmount(nextValue);
  };

  return (
    <Box>
      <Range init={value()} min={0} max={200} onChange={handleAmountChange} />
    </Box>
  );
};

export default Controls;
