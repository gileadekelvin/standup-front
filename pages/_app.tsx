import "../styles/globals.css";
import type { AppProps } from "next/app";
import { Suspense } from "react";
import { RelayEnvironmentProvider } from "react-relay/hooks";

import { useRelayEnvironment } from "../lib/relay";

function MyApp({ Component, pageProps }: AppProps) {
  const relayEnvironment = useRelayEnvironment(pageProps);

  return (
    <RelayEnvironmentProvider environment={relayEnvironment}>
      <Suspense fallback={"Loading..."}>
        <Component {...pageProps} />
      </Suspense>
    </RelayEnvironmentProvider>
  );
}

export default MyApp;
