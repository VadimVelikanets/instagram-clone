import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import styles from "./BtnFacebookAuth.module.scss";
import {fetchUserFacebook} from "../../../store/action-creators/user";
import {useDispatch} from "react-redux";
import Image from "next/image";
import {BtnFacebookProps} from "./types";
import {useRouter} from "next/router";
import {checkFBUserExist, checkUserExist} from "../../../pages/api/signUp";
import {fetchProfile} from "../../../store/action-creators/profile";

const BtnFacebookAuth = ({className} : BtnFacebookProps) => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {t} = useTranslation()

    const checkFacebookUserExist = (user) => {
        checkFBUserExist(user?.email).then((res)=> {
            if(!res) {
                router.push('/account/facebook-signup')
            } else {
                dispatch(fetchProfile(user?.uid)).then(() => router.push('/'))
            }
        })
    }

    const signInFacebook =  () => {
        dispatch(fetchUserFacebook()).then(async (res) => {
            checkFacebookUserExist(res)
        })
    }

    return (
        <button onClick={signInFacebook} className={`${styles.btnFacebook} ${className}`}>
            <Image src="/images/facebook-logo.png" width="16" height="16"/>
            <span>{t('loginPage.facebookLogin')}</span>
        </button>
    );
};

export default BtnFacebookAuth;