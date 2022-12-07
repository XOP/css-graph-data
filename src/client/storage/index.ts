import { createRoot } from "solid-js";
import { createLocalStorage } from '@solid-primitives/storage';

const storage = () => createLocalStorage({
  api: localStorage,
  prefix: 'cgd',
});

export default createRoot(storage);
