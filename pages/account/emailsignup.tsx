import React from 'react';
import SignupForm from "../../components/molecules/SignupForm/SignupForm";
import Head from "next/head";

const Emailsignup = () => {
    return (
        <div>
            <Head>
                <title>Sign up</title>
            </Head>
            <SignupForm/>
        </div>
    );
};

export default Emailsignup;