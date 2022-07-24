import type { NextPageWithLayout } from './_app';

import { ReactElement } from 'react';

import Layout from '../src/components/Layout';
import MyTeam from '../src/components/MyTeam';

const Home: NextPageWithLayout = () => {
  return <MyTeam />;
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export default Home;
