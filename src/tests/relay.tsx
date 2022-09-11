import { Suspense } from 'react';
import { RelayEnvironmentProvider } from 'react-relay';
import { MockEnvironment } from 'relay-test-utils';

export const withRelayProvider = (Component: React.ReactNode, environment: MockEnvironment) => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback='Loading...'>
        {Component}
      </Suspense>
    </RelayEnvironmentProvider>
  );
};
