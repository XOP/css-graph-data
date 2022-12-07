import { Accessor, createContext, createSignal, useContext } from 'solid-js';

import ls from '../../storage';

const [storage, setStorage] = ls;
export interface IControls {
  amount: Accessor<number>;
  setAmount: Function;
  isGrid: Accessor<boolean>;
  setIsGrid: Function;
}

const CONTROLS_KEYS = {
  amount: 'amount',
  isGrid: 'isGrid',
};

const ControlsContext = createContext<IControls>(null);

export const ControlsProvider = (props) => {
  const [amount, _setAmount] = createSignal(
    +storage[CONTROLS_KEYS.amount] || 100
  );

  const [isGrid, _setIsGrid] = createSignal(
    !!storage[CONTROLS_KEYS.isGrid] || false
  );

  const setAmount = (val: number) => {
    _setAmount(val);
    setStorage(CONTROLS_KEYS.amount, val.toString());
  };

  const setIsGrid = (val: boolean) => {
    _setIsGrid(val);
    setStorage(CONTROLS_KEYS.isGrid, val.toString());
  };

  return (
    <ControlsContext.Provider
      value={{ amount, setAmount, isGrid, setIsGrid }}
      children={props.children}
    />
  );
};

export const useControls = () => useContext(ControlsContext);
