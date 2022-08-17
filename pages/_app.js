import '../styles/normalize.css'
import '../styles/globals.css'
import Header from '../components/Header'
import Head from 'next/head'
import { ThemeProvider } from '../lib/theme'
import { AuthUserContext, AuthUserProvider } from '../lib/authUserContext'
import { useUserData } from '../lib/hooks'
import { Toaster } from 'react-hot-toast'

function MyApp({ Component, pageProps }) {

  

  return <>
    <Head>
      <title>Tea Blog</title>
    </Head>
    <AuthUserProvider>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
        <Toaster />
      </ThemeProvider>
    </AuthUserProvider>
  </>
}

export default MyApp
