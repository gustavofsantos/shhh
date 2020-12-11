import Head from 'next/head'
import '../styles/globals.css'
import { Footer } from '../components/footer'

function App({ Component, pageProps }) {
  return (
    <main className="w-full flex flex-col items-center bg-red-500 dark:bg-red-900">
      <Head>
        <title>Shhh</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;500;700;800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@500&display=swap"
          rel="stylesheet"
        />
      </Head>
      <Component {...pageProps} />

      <br />

      <Footer />
    </main>
  )
}

export default App
