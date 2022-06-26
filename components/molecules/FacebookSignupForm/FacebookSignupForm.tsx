import React, {useEffect, useState} from 'react';
import {useTranslation} from "react-i18next";
import styles from './FacebookSignupForm.module.scss';
import Image from "next/image";
import Link from "next/link";
import {checkUserExist, signUpFacebook} from "../../../pages/api/signUp";
import {useRouter} from "next/router";
import Input from "../../atoms/Input/Input";
import Button from "../../atoms/Button/Button";
import {useAppSelector} from "../../../hooks";


const FacebookSignupForm = () => {
    const {t} = useTranslation();
    const user = useAppSelector(state => state.user?.user)
    const profile = useAppSelector(state => state.profile?.profile)
    const router = useRouter()
    const [name, setName] = React.useState('')
    const [nickname, setNickname] = React.useState('')
    const [isDisableSubmit, setDisableSubmit] = useState(false);
    const [isUserExist, setUserExist] = useState(false);

    if(profile) {
        router.push('/')
    }

    const createUser = () => {
        signUpFacebook(user, name, nickname).then(() => {
                router.push('/account/login')
        })
    }

    const signUpHandler =  () => {
        setDisableSubmit(true)
        checkUserExist(nickname, user?.email)
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
        if(name.length < 3 ||
            nickname.length < 3) {
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [ name, nickname])

    return (
        <>
            <div className={styles.login}>
                <Image src="/images/login-logo.png" width="175" height="51" className={`${styles.logo} mb-8`}/>
                <div className={styles.text}>{t('signupPage.title')}</div>
                <div className="form mt-6 flex flex-col w-full">
                    <Input value={name}
                           onChange={e => setName(e.target.value)}
                           type="text"
                           label={t('signupPage.fullname')}/>
                    <Input value={nickname}
                           onChange={e => setNickname(e.target.value)}
                           type="text"
                           label={t('signupPage.username')}/>

                    <Button disabled={isDisableSubmit} btnEvent={signUpHandler}
                            className="my-3 bg-blue-400 text-white py-2 px-4 rounded-md"
                            text={t('signupPage.signUp')} />
                    {isUserExist &&  <div className={styles.error}>{t('signupPage.nickNameExits')}</div>}
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

export default FacebookSignupForm;