import React from 'react';
import {useTranslation} from "react-i18next";
import styles from "./BtnFacebookAuth.module.scss";
import {fetchUserFacebook} from "../../../store/action-creators/user";
import {useDispatch} from "react-redux";
import Image from "next/image";
import {BtnFacebookProps} from "./types";

const BtnFacebookAuth = ({className} : BtnFacebookProps) => {

    const dispatch = useDispatch()
    const {t} = useTranslation()
    const signInFacebook = () => {
        dispatch(fetchUserFacebook())
    }
    return (
        <button onClick={signInFacebook} className={`${styles.btnFacebook} ${className}`}>
            <Image src="/images/facebook-logo.png" width="16" height="16"/>
            <span>{t('loginPage.facebookLogin')}</span>
        </button>
    );
};

export default BtnFacebookAuth;