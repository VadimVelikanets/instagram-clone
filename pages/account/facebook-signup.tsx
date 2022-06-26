import React from 'react';
import Head from "next/head";
import FacebookSignupForm from "../../components/molecules/FacebookSignupForm/FacebookSignupForm";

const FacebookSignupPage = () => {
    return (
        <div>
            <Head>
                <title>Facebook Sign up</title>
            </Head>
            <FacebookSignupForm/>
        </div>
    );
};

export default FacebookSignupPage;