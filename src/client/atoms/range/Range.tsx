import { createSignal, createUniqueId, onMount } from 'solid-js';

import '@shoelace-style/shoelace/dist/components/range/range.js';

export interface IRange {
  min: number | string;
  max: number | string;
  init: number | string;
  onChange: (value: number | string) => void;
}

const Range = (props: IRange) => {
  let rangeRef;

  const id = createUniqueId();
  const { min, max, init, onChange } = props;

  const [value, setValue] = createSignal(init);

  const handleChange = (e) => {
    const nextValue = e.target.value;

    setValue(nextValue);
    onChange(nextValue);
  };

  onMount(() => {
    rangeRef.addEventListener('sl-change', handleChange);
  });

  return (
    <div class="sl-theme-dark">
      <sl-range
        id={id}
        ref={rangeRef}
        value={init}
        min={min}
        max={max}
        step={5}
        label={`Data samples amount: ${value()}`}
      ></sl-range>
    </div>
  );
};

export default Range;
