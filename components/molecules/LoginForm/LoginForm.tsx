import React, {useEffect, useState} from 'react';
import {useDispatch} from "react-redux";
import {fetchUserEmail} from "../../../store/action-creators/user";
import {useTranslation} from "react-i18next";
import styles from './LoginForm.module.scss';
import Image from "next/image";
import Link from "next/link";
import Button from "../../atoms/Button/Button";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword/InputPassword";
import BtnFacebookAuth from "../../atoms/BtnFacebookAuth/BtnFacebookAuth";
import FormText from "../../atoms/FormText/FormText";
import {useAppSelector} from "../../../hooks";
import {useRouter} from "next/router";
const LoginForm = () => {

    const dispatch = useDispatch();
    const {t} = useTranslation();
    const user = useAppSelector(state => state.user?.user)
    const router = useRouter()

    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isDisableSubmit, setDisableSubmit] = useState(false)

    useEffect(() => {
        if(user) {
            router.push('/')
        }
    }, [user])

    useEffect(() => {
        if(email === '' || password === '') {
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [email, password])

    const signInEmail = async () => {
        dispatch(fetchUserEmail({email,password}))
    }
    return (
        <>
            <div className={styles.login}>
            <Image src="/images/login-logo.png" width="175" height="51" className={`${styles.logo}`}/>
            <div className="form mt-8 flex flex-col w-full">
                <Input value={email}
                       type="text"
                       onChange={e => setEmail(e.target.value)}
                       label={t('loginPage.email')} />
                <InputPassword value={password}
                               onChange={e => setPassword(e.target.value)}
                               label={t('loginPage.password')} />
                <Button disabled={isDisableSubmit} btnEvent={signInEmail} className="my-3 bg-blue-400 text-white py-2 px-4 rounded-md" text={t('loginPage.SignIn')} />
            </div>
            <FormText/>
            <BtnFacebookAuth className="my-4"/>
            <Link className={styles.forgotLink} href="/account/reset"><span className={styles.forgotLink}>{t('loginPage.forgotPassword')}</span></Link>
            </div>
            <div className={styles.signupInfo}>
                <span className={styles.signupInfoText}>
                    {t('loginPage.haveAnAccount')} <Link href="/account/emailsignup"><span className={styles.signupInfoLink}>{t('loginPage.SignUp')} </span></Link>
                </span>

            </div>
        </>

    );
};

export default LoginForm;