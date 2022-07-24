import type { NextPage } from 'next';
import Head from 'next/head';
import styles from '../styles/Home.module.css';

import MyTeam from '../components/MyTeam';

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
