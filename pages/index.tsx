import type { NextPage } from 'next'
import styles from '../styles/pages/Home.module.scss'
import Head from 'next/head';
import PostList from "../components/molecules/PostList/PostList";
const Home: NextPage = () => {
  return (
    <div className={styles.container}>
        <Head>
            <title>Instagram</title>
        </Head>
      {/*<PostList/>*/}
        <div>Main</div>
    </div>
  )
}

export default Home
