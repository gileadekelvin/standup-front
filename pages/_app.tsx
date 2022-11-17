import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import type { AppProps } from 'next/app';

import { appWithTranslation } from 'next-i18next';
import { CssVarsProvider } from '@mui/joy/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import LinearProgress from '@mui/joy/LinearProgress';
import { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay/hooks';
import 'react-toastify/dist/ReactToastify.min.css';

import { useRelayEnvironment } from '../lib/relay';
import { theme } from '../src/JoyTheme';
import Toast from '../src/components/Toast';

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
        <LocalizationProvider dateAdapter={AdapterDateFns}>
          <Suspense fallback={<LinearProgress variant='soft' size='sm' />}>
            {getLayout(<Component {...pageProps} />)}
          </Suspense>
          <Toast />
        </LocalizationProvider>
      </CssVarsProvider>
    </RelayEnvironmentProvider>
  );
}

export default appWithTranslation(MyApp);
