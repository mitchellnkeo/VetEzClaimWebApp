import { Html, Head, Main, NextScript } from 'next/document';
import { ZEFFY_EMBED_SCRIPT_URL } from '../constants/donate';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Nunito:wght@400;500;600;700;800&display=swap"
        />
        <script src={ZEFFY_EMBED_SCRIPT_URL} async />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
