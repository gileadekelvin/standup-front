import { getInitColorSchemeScript } from '@mui/joy/styles';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head></Head>
        <body>
          {getInitColorSchemeScript()}
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
