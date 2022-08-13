import '../styles/normalize.css'
import '../styles/globals.css'
import Header from '../components/Header'
import Head from 'next/head'
import { ThemeProvider } from '../lib/theme'
import { AuthUserContext } from '../lib/authUserContext'
import { useUserData } from '../lib/hooks'

function MyApp({ Component, pageProps }) {
  const userData = useUserData();

  return <>
    <Head>
      <title>Tea Blog</title>
    </Head>
    <AuthUserContext.Provider value={userData}>
      <ThemeProvider>
        <Header />
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthUserContext.Provider>
  </>
}

export default MyApp
