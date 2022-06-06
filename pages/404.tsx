import type { NextPage } from 'next'
import Link from "next/link";
import styles from '../styles/pages/Error.module.scss'

const Error: NextPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.inner}>
                <div className={styles.title}>К сожалению, эта страница недоступна.</div>
                <div className={styles.text}>Возможно, вы воспользовались недействительной ссылкой или страница была удалена. <Link href="/">Назад в Instagram.</Link></div>
            </div>
        </div>
    )
}

export default Error
