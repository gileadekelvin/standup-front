import type { NextPage } from 'next';

import MyTeam from '../components/MyTeam';
import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>
      <MyTeam />
    </div>
  );
};

export default Home;
