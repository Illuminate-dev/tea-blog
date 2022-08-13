import '../styles/normalize.css'
import '../styles/globals.css'
import Header from '../components/Header'
import Head from 'next/head'
import { ThemeProvider } from '../lib/theme'


function MyApp({ Component, pageProps }) {
  return <>
      <Head>
        <title>Tea Blog</title> 
      </Head>      
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </>
}

export default MyApp
