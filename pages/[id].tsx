import type { NextPage } from 'next'
import styles from '../styles/pages/Home.module.scss'
import Profile from "../components/organism/Profile/Profile";
import Head from 'next/head';
import {getProfileData, getUserData} from "./api/profile";
import {useRouter} from "next/router";

const ProfilePage: NextPage = ({data}: any) => {
    const {query} = useRouter();
    return (
        <div className={styles.container}>
            <Head>
                <title>{data.name} - (@{data.nickname}) -Instagram</title>
            </Head>
            <Profile profileData={data}/>
        </div>
    )
}

export default ProfilePage

export const getServerSideProps = async ({params}) => {

    const response = getUserData(params.id)
    const user = await response.then(res =>res)
    const [data] = user
    if (!data) {
        return {
            notFound: true,
        }
    }
    return {
        props: {
            data: data
        }

    }
}