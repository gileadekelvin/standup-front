import { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { MockEnvironment } from 'relay-test-utils';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

export const withRelayProvider = (Component: React.ReactNode, environment: MockEnvironment) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <Suspense fallback='Loading...'>{Component}</Suspense>
      </LocalizationProvider>
    </RelayEnvironmentProvider>
  );
};
