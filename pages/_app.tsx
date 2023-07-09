import type { AppProps } from 'next/app'
import Layout from '@components/Layout/Layout'
import 'style.css'

export function reportWebVitals (metric: any): void {
  console.log(metric)
}

const MyApp = ({ Component, pageProps }: AppProps) => {
  // Providers - Context/Providers, Theme, data
  // Layout
  // props additional
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
