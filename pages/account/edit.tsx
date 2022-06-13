import React from 'react';
import Head from "next/head";
import {useTranslation} from "react-i18next";
import EditForm from "../../components/molecules/EditForm/EditForm";
import styles from '../../styles/pages/Edit.module.scss';
import Link from "next/link";
const EditPage = () => {
    const {t} = useTranslation()

    return (
        <div className={styles.page}>
            <Head>
                <title>{t('editPage.editProfile')}</title>
            </Head>
            <div className={styles.wrapper}>
                <div className={styles.sidebar}>
                    <div className={`${styles.sidebarItem} ${styles.sidebarItem_active}`}>
                        <Link href="/account/edit">{t('editPage.editProfile')}</Link>
                    </div>
                </div>
                <EditForm/>
            </div>
            
        </div>
    );
};

export default EditPage;