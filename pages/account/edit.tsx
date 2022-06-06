import React from 'react';
import Head from "next/head";
import EditForm from "../../components/molecules/EditForm/EditForm";
import styles from '../../styles/pages/Edit.module.scss';
import Link from "next/link";
const EditPage = () => {
    return (
        <div className={styles.page}>
            <Head>
                <title>Edit profile</title>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.sidebar}>
                    <div className={`${styles.sidebarItem} ${styles.sidebarItem_active}`}>
                        <Link href="/account/edit">Редактировать профиль</Link>
                    </div>
                </div>
                <EditForm/>
            </div>
            
        </div>
    );
};

export default EditPage;