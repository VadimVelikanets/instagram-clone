import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import styles from './SignupForm.module.scss';
import Image from "next/image";
import Link from "next/link";
import {checkUserExist} from "../../../pages/api/signUp";
import {signUp} from "../../../pages/api/signUp";
import {useRouter} from "next/router";
import Input from "../../atoms/Input/Input";
import InputPassword from "../../atoms/InputPassword/InputPassword";
import Button from "../../atoms/Button/Button";
import BtnFacebookAuth from "../../atoms/BtnFacebookAuth/BtnFacebookAuth";
import FormText from "../../atoms/FormText/FormText";
import {useAppSelector} from "../../../hooks";
import {useDispatch} from "react-redux";


const SignupForm = () => {
    const {t} = useTranslation();
    const user = useAppSelector(state => state.user?.user)
    const router = useRouter()
    const [email, setEmail] = React.useState('')
    const [name, setName] = React.useState('')
    const [nickname, setNickname] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [isDisableSubmit, setDisableSubmit] = useState(false);
    const [isUserExist, setUserExist] = useState(false);

    if(user) {
        router.push('/')
    }

    const createUser = () => {
        signUp(email, password, name, nickname).then(() => {
                router.push('/account/login')
        })
    }

    const signUpHandler =  () => {
        setDisableSubmit(true)
        checkUserExist(nickname, email)
            .then((res)=> {
                if(!res) {
                    createUser()
                } else {
                    setUserExist(true)
                }
            })
            .then(() => setDisableSubmit(false))
    };

    useEffect(() => {
        if(email === '' ||
            password.length < 5 ||
            name.length < 3 ||
            nickname.length < 3) {
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [email, password, name, nickname])

    return (
        <>
            <div className={styles.login}>
                <Image src="/images/login-logo.png" width="175" height="51" className={`${styles.logo} mb-8`}/>
                <div className={styles.text}>{t('signupPage.title')}</div>
                <BtnFacebookAuth className="mb-3"/>
                <FormText/>
                <div className="form mt-6 flex flex-col w-full">
                    <Input value={email}
                           onChange={e => setEmail(e.target.value)}
                           type="text"
                           label={t('signupPage.email')}/>
                    <Input value={name}
                           onChange={e => setName(e.target.value)}
                           type="text"
                           label={t('signupPage.fullname')}/>
                    <Input value={nickname}
                           onChange={e => setNickname(e.target.value)}
                           type="text"
                           label={t('signupPage.username')}/>
                    <InputPassword value={password}
                                   onChange={e => setPassword(e.target.value)} label={t('signupPage.password')} />
                    <Button disabled={isDisableSubmit} btnEvent={signUpHandler}
                            className="my-3 bg-blue-400 text-white py-2 px-4 rounded-md"
                            text={t('signupPage.signUp')} />
                    {isUserExist &&  <div className={styles.error}>Nickname or email already exist</div>}
                </div>
            </div>
            <div className={styles.signupInfo}>
                <span className={styles.signupInfoText}>
                    {t('signupPage.haveAccount')} <Link href="/account/login"><span className={styles.signupInfoLink}>{t('signupPage.login')}</span></Link>
                </span>

            </div>
        </>

    );
};

export default SignupForm;