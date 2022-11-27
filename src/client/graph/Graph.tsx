import { useEffect } from 'react';

import styles from './graph.module.css';

interface GraphType {
  title: string;
}

const Graph = ({ title }: GraphType) => {
  useEffect(() => {
    const getData = async function () {
      const res = await fetch('/data.json');
      const data = await res.json();

      console.log(data);
    };

    getData();
  }, []);

  return (
    <section className={styles.section}>
      <h1>{title}</h1>
    </section>
  );
};

export default Graph;
