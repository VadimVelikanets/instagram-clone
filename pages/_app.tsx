import '../styles/globals.scss'
import Layout from "../components/layouts/Layout/Layout"
import type { AppProps } from 'next/app'
import {Provider} from "react-redux";
import {store} from "../store/index"
import {useRouter} from "next/router";

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
      <>
        <Provider store={store}>
          <Layout>
              <Component {...pageProps} />
          </Layout>
        </Provider>

      </>)
}

export default MyApp
