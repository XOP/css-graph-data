import { createSignal, createUniqueId } from 'solid-js';

export interface IRange {
  min: number | string;
  max: number | string;
  init: number | string;
  onChange: (value: number | string) => void;
}

const Range = (props: IRange) => {
  const id = createUniqueId();
  const { min, max, init, onChange } = props;

  const [value, setValue] = createSignal(init);

  const handleChange = (e) => {
    const nextValue = e.target.value;

    setValue(nextValue);
    onChange(nextValue);
  };

  return (
    <form>
      <label htmlFor={id}>{value()}</label>
      <input
        id={id}
        value={init}
        type="range"
        min={min}
        max={max}
        step={5}
        onchange={handleChange}
      />
    </form>
  );
};

export default Range;
