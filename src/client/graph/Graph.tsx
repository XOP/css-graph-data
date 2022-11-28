import data from '../data/data';

import styles from './graph.module.css';
interface GraphType {
  title: string;
}

const Graph = ({ title }: GraphType) => {
  return (
    <section className={styles.section}>
      <h1>{title}</h1>
      <code>
        <pre>{JSON.stringify(data(), null, 2)}</pre>
      </code>
    </section>
  );
};

export default Graph;
