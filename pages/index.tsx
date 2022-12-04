import type { NextPageWithLayout } from './_app';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { unstable_getServerSession } from 'next-auth';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { fetchQuery } from 'react-relay';

import Layout from '../src/components/Layout';
import MyTeam from '../src/components/MyTeam';
import Login from '../src/components/Login';
import { finalizeRelay, initializeRelay } from '../lib/relay';
import { myTeamQuery } from '../src/components/MyTeam/MyTeam.gql';
import { MyTeamQuery } from '../__generated__/MyTeamQuery.graphql';
import { authOptions } from './api/auth/[...nextauth]';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>My Team</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Login />
      <MyTeam />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale }) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  const environment = initializeRelay(undefined, session?.accessToken);

  // this will fetch the dailies in the server
  const dailies = await fetchQuery<MyTeamQuery>(environment, myTeamQuery, {}).toPromise();

  // this will hydrate the relay store with the dailies already fetched on the server
  return finalizeRelay(environment, {
    props: {
      data: dailies,
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  });
};

export default Home;
