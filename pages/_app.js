import '../styles/normalize.css'
import '../styles/globals.css'
import Header from '../components/Header'
import Head from 'next/head'


function MyApp({ Component, pageProps }) {
  return <>
      <Head>
        <title>Tea Blog</title> 
      </Head>      
      <Header />
      <Component {...pageProps} />
    </>
}

export default MyApp
