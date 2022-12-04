import { Accessor, For, onMount } from 'solid-js';

import '@shoelace-style/shoelace/dist/components/button-group/button-group';
import '@shoelace-style/shoelace/dist/components/button/button';

import styles from './choose.module.css';

type ChooseValueType = {
  value: number | string | boolean;
  label: string;
};

export interface IChoose {
  value: Accessor<number | string | boolean>;
  values: ChooseValueType[];
  onChange: (value: number | string) => void;
}

const Choose = (props: IChoose) => {
  let groupRef;

  const { value: currentValue, values, onChange } = props;

  onMount(() => {
    groupRef.addEventListener('click', (e) => {
      if (e.target.tagName !== 'SL-BUTTON') return;

      onChange(e.target.value);
    });
  });

  return (
    <div class="sl-theme-dark">
      <sl-button-group ref={groupRef}>
        <For
          each={values}
          children={({ value, label }: ChooseValueType) => (
            <sl-button class={styles.button} value={value} disabled={currentValue() === value}>
              {label}
            </sl-button>
          )}
        ></For>
      </sl-button-group>
    </div>
  );
};

export default Choose;
