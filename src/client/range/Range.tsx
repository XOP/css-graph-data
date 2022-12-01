export interface IRange {
  min: number | string;
  max: number | string;
  onChange: (e: InputEvent) => void;
}

const Range = (props: IRange) => {
  const { min, max, onChange } = props;

  return <input type="range" min={min} max={max} onChange={onChange} />;
};

export default Range;
