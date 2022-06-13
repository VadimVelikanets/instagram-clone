import React from 'react';
import {useTranslation} from "react-i18next";
import ResetForm from "../../components/molecules/ResetForm/ResetForm";
import Head from "next/head";

const Reset = () => {

    const {t} = useTranslation()
    return (
        <div>
            <Head>
                <title>{t('resetPage.head')} - Instagram</title>
            </Head>
            <ResetForm/>
        </div>
    );
};

export default Reset;