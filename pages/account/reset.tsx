import React from 'react';
import ResetForm from "../../components/molecules/ResetForm/ResetForm";
import Head from "next/head";

const Reset = () => {
    return (
        <div>
            <Head>
                <title>Reset Password</title>
            </Head>
            <ResetForm/>
        </div>
    );
};

export default Reset;