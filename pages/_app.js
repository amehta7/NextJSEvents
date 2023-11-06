import Head from 'next/head'
import Layout from '../components/Layout/Layout'
import '../styles/globals.css'

import { NotificationCtxProvider } from '../store/notification-context'

function MyApp({ Component, pageProps }) {
  return (
    <NotificationCtxProvider>
      <Layout>
        <Head>
          <title>NextJS Events</title>
          <meta name='description' content='NextJS Events' />
          <meta
            name='viewport'
            content='initial-scale=1.0,width=device-width'
          />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </NotificationCtxProvider>
  )
}

export default MyApp
