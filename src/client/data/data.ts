import { createSignal, createResource } from 'solid-js';

const fetchData = async function () {
  const res = await fetch('/data.json');
  const _ = await res.json();

  return _.slice(0, 1);
};

const [_, setData] = createSignal([]);
const [data] = createResource(_, fetchData);

export default data;
