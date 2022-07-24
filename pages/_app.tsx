import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { CssVarsProvider } from '@mui/joy/styles';
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
        <Suspense fallback={'Loading...'}>{getLayout(<Component {...pageProps} />)}</Suspense>
      </CssVarsProvider>
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
