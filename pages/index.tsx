import type { NextPage } from 'next'
import styles from '../styles/pages/Home.module.scss'
import Head from 'next/head';
import PostList from "../components/molecules/PostList/PostList";
import SearchInput from "../components/atoms/SearchInput/SearchInput";
import useBreakpoint from "../hooks/useBreakpoint";

const Home: NextPage = () => {

  const breakpoint = useBreakpoint();
  return (
    <div className={styles.container}>
        <Head>
            <title>Instagram</title>
        </Head>
        {breakpoint.width <= 960 && (
            <SearchInput/>
        )}
      <PostList/>
    </div>
  )
}

export default Home
