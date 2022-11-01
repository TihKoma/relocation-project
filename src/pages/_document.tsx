import Document, { Head, Html, Main, NextScript } from 'next/document'

import { GoogleTagManager } from '@/modules/analytics'

class MyDocument extends Document {
  render() {
    return (
      <Html lang={'en'}>
        <Head>
          <GoogleTagManager.GTMHead />
          <link
            rel={'apple-touch-icon'}
            sizes={'180x180'}
            href={'/apple-touch-icon.png'}
          />
          <link
            rel={'icon'}
            type={'image/png'}
            sizes={'32x32'}
            href={'/favicon-32x32.png'}
          />
          <link
            rel={'icon'}
            type={'image/png'}
            sizes={'16x16'}
            href={'/favicon-16x16.png'}
          />
          <link rel={'manifest'} href={'/site.webmanifest'} />
          <link
            rel={'mask-icon'}
            href={'/safari-pinned-tab.svg'}
            color={'#3f37c9'}
          />
          <meta name={'apple-mobile-web-app-title'} content={'Nicity'} />
          <meta name={'application-name'} content={'Nicity'} />
          <meta name={'msapplication-TileColor'} content={'#3f37c9'} />
          <meta name={'theme-color'} content={'#fff'} />
        </Head>
        <body>
          <GoogleTagManager.GTMBody />
          <Main />
          <NextScript />
          <div id={'modalRoot'} />
        </body>
      </Html>
    )
  }
}

export default MyDocument
