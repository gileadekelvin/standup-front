import type { NextPageWithLayout } from './_app';

import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { ReactElement } from 'react';
import { Grid } from '@mui/joy';

import Layout from '../src/components/Layout';
import InviteComponent from '../src/components/Invite';

const Invite: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Invite</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Grid container spacing={1} direction='column' sx={{ mx: 'auto', maxWidth: 600 }}>
        <InviteComponent />
      </Grid>
    </>
  );
};

Invite.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export const getServerSideProps: GetServerSideProps = async ({ req, res, locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? 'en', ['common'])),
    },
  };
};

export default Invite;
