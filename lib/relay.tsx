// Code based on https://github.com/vercel/next.js/blob/266b95107aa228873097770e94fd09264fa3ae72/examples/with-relay/lib/relay.jsx
// Copyright https://github.com/jesstelford

import { getSession } from 'next-auth/react';
import { useMemo } from 'react';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  RequestParameters,
  Variables,
} from 'relay-runtime';

export const RELAY_INITIAL_RECORDS_PROP = '__RELAY_INITIAL_RECORDS__';

let relayEnvironment: Environment;

const getAuthToken = async (authToken?: string | null) => {
  if (authToken) {
    // Returns accessToken on the server side
    return authToken;
  }
  // To get accessToken on the client side
  const session = await getSession();
  return session?.accessToken;
};

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise
const genFetchRelay = (authToken?: string | null) => {
  const fetchRelay = async (operation: RequestParameters, variables: Variables) => {
    const token = await getAuthToken(authToken);
    const response = await fetch(process.env.NEXT_PUBLIC_RELAY_ENDPOINT as string, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: token ?? '',
      },
      body: JSON.stringify({
        query: operation.text,
        variables,
      }),
    });
    return await response.json();
  };
  return fetchRelay;
};

const createEnvironment = (authToken?: string | null) =>
  new Environment({
    // Create a network layer from the fetch function
    network: Network.create(genFetchRelay(authToken)),
    store: new Store(new RecordSource()),
  });

// For use in non-react contexts: getServerSideProps, getStaticProps,
// getInitialProps, pages/api routes.
// Should be paired with finalizeRelay() with get*Props() methods.
export const initializeRelay = (initialRecords?: any, authToken?: string | null) => {
  // Create a network layer from the fetch function
  const environment = relayEnvironment ?? createEnvironment(authToken);

  // If your page has Next.js data fetching methods that use Relay, the initial records
  // will get hydrated here
  if (initialRecords) {
    environment.getStore().publish(new RecordSource(initialRecords));
  }

  if (typeof window === 'undefined') {
    // Tell relay to stop its normal garbage collection processes. This prevents
    // data being lost between calling relay's `fetchQuery` and our
    // `finalizeRelay` method below
    environment.getStore().holdGC();

    // For SSG and SSR always create a new Relay environment
    return environment;
  }

  // Create the Relay environment once in the client
  if (!relayEnvironment) relayEnvironment = environment;

  return relayEnvironment;
};

// Used to re-hydrate the relay cache in the client.
// Works with getStaticProps() & getServerSideProps(). For use with
// getInitialProps(), see finalizeRelayInitialProps()
export const finalizeRelay = (environment: Environment, pageProps: any) => {
  pageProps.props = pageProps.props ?? {};
  pageProps.props[RELAY_INITIAL_RECORDS_PROP] = environment.getStore().getSource().toJSON();

  return pageProps;
};

// Used to re-hydrate the relay cache in the client.
// Works with getInitialProps(). For use with getServerSideProps() or
// getStaticProps(), see finalizeRelay()
export const finalizeRelayInitialProps = (environment: Environment, pageProps: any = {}) => {
  pageProps[RELAY_INITIAL_RECORDS_PROP] = environment.getStore().getSource().toJSON();

  return pageProps;
};

// For use in react components
export const useRelayEnvironment = (pageProps: any) => {
  const initialRecords = pageProps[RELAY_INITIAL_RECORDS_PROP];
  return useMemo(() => initializeRelay(initialRecords), [initialRecords]);
};
