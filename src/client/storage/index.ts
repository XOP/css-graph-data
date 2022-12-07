import { createLocalStorage } from '@solid-primitives/storage';

const storage = createLocalStorage({
  api: localStorage,
  prefix: 'cgd',
});

export default storage;
