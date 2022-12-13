import { ReactElement } from 'react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
import { ClientSafeProvider, getProviders, signIn } from 'next-auth/react';
import { Box, Button, Card } from '@mui/joy';
import { Grid } from '@mui/material';
import Google from '@mui/icons-material/Google';

import { NextPageWithLayout } from '../_app';
import logo from '../../public/logo.svg';

const Login: NextPageWithLayout<{ providers: ClientSafeProvider[] }> = ({ providers }) => {
  const router = useRouter();

  return (
    <>
      <Head>
        <title>Sign in</title>
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
      </Head>
      <Grid
        container
        spacing={1}
        direction='row'
        alignItems='center'
        justifyContent='center'
        sx={{
          mx: 'auto',
          maxWidth: 600,
        }}
      >
        <Card
          sx={{
            paddingTop: 3,
            paddingBottom: 5,
            paddingX: 7,
            justifyContent: 'center',
            borderRadius: 0,
            border: '4px solid #000',
            boxShadow: '8px 8px #000'
          }}
        >
          <Box display='flex' flexDirection='column' alignItems='center'>
            <Box mb={3}>
              <Image src={logo} alt='Standup Daily' height='150px' width='250px'></Image>
            </Box>
            {Object.values(providers).map((provider) => {
              return (
                <Button
                  key={provider.id}
                  sx={{ maxWidth: '200px' }}
                  onClick={() =>
                    signIn(provider.id, {
                      callbackUrl: (router.query.callbackUrl as string) ?? '/',
                    })
                  }
                  startDecorator={<Google />}
                >
                  Sign in with {provider.name}
                </Button>
              );
            })}
          </Box>
        </Card>
      </Grid>
    </>
  );
};

Login.getLayout = function getLayout(page: ReactElement) {
  return (
    <Grid
      container
      sx={{
        background: `linear-gradient(-135deg,#c850c0,#4158d0)`,
        minHeight: '100vh',
      }}
    >
      {page}
    </Grid>
  );
};

export const getServerSideProps: GetServerSideProps = async (_context) => {
  const providers = await getProviders();
  return {
    props: { providers },
  };
};

export default Login;
