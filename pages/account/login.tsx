import React from 'react';
import LoginForm from "../../components/molecules/LoginForm/LoginForm";
import Head from "next/head";

const Login = () => {
    return (
        <div>
            <Head>
                <title>Login</title>
            </Head>
            <LoginForm/>
        </div>
    );
};

export default Login;