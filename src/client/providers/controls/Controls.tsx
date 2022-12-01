import { Accessor, createContext, Setter, useContext } from 'solid-js';

import { createSignal } from 'solid-js';

export interface IControls {
  amount: Accessor<number>;
  setAmount: Setter<number>;
  isGrid: Accessor<boolean>;
  setIsGrid: Setter<boolean>;
}

const ControlsContext = createContext<IControls>(null);

export const ControlsProvider = (props) => {
  const [amount, setAmount] = createSignal(100);
  const [isGrid, setIsGrid] = createSignal(false);

  return (
    <ControlsContext.Provider
      value={{ amount, setAmount, isGrid, setIsGrid }}
      children={props.children}
    />
  );
};

export const useControls = () => useContext(ControlsContext);
