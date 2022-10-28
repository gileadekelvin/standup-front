import type { NextPageWithLayout } from './_app';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { fetchQuery } from 'react-relay';

import Layout from '../src/components/Layout';
import MyTeam from '../src/components/MyTeam';
import { finalizeRelay, initializeRelay } from '../lib/relay';
import { myTeamQuery } from '../src/components/MyTeam/MyTeam.gql';
import { MyTeamQuery } from '../__generated__/MyTeamQuery.graphql';

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>My Team</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <MyTeam />
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  const environment = initializeRelay();

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
