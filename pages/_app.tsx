import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { appWithTranslation } from 'next-i18next';
import { CssVarsProvider } from '@mui/joy/styles';
import { CircularProgress } from '@mui/material';
import { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';

import { useRelayEnvironment } from '../lib/relay';
import { theme } from '../src/JoyTheme';

export type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};
type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const relayEnvironment = useRelayEnvironment(pageProps);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <CssVarsProvider theme={theme}>
        <Suspense fallback={<CircularProgress />}>
          {getLayout(<Component {...pageProps} />)}
        </Suspense>
      </CssVarsProvider>
    </RelayEnvironmentProvider>
  );
}

export default appWithTranslation(MyApp);
