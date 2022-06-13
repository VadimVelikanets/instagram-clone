import React from 'react';
import {useTranslation} from "react-i18next";
import styles from "./FormText.module.scss";

const FormText = () => {
    const {t} = useTranslation()
    return (
        <div className={styles.orText}><span>{t('loginPage.or')}</span></div>
    );
};

export default FormText;