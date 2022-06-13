import React, {useState} from 'react';
import {useTranslation} from "react-i18next";
import styles from "./InputPassword.module.scss";
import {InputProps} from "./types";

const InputPassword = ({value, onChange, placeholder, label}: InputProps) => {
    const [isShowPassword, setSetPassword] = useState<boolean>(false);
    const {t} = useTranslation();
    const showPasswordHandler = () => {
        setSetPassword(!isShowPassword)
    }
    return (
        <div className={styles.input}>
            <input type={isShowPassword ? "text" : "password"}
                   value={value}
                   onChange={onChange}
                   placeholder={placeholder}/>
            {label && <div className={styles.label}>{label}</div>}
            <button className={styles.passwordBtn} onClick={showPasswordHandler}>{isShowPassword ? t('loginPage.hidePassword') : t('loginPage.showPassword')}</button>
        </div>
    );
};

export default InputPassword;