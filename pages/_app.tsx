import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { appWithTranslation } from "next-i18next"
import Layout from '../components/Layout'
import useAuth from '../features/auth/hooks/useAuth'
import AuthProvider from '../features/auth/context/AuthContext'

function MyApp({ Component, pageProps }: AppProps) {

  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  )
}

export default appWithTranslation(MyApp)
