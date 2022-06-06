import React from 'react';
import styles from "./Input.module.scss";
import {InputProps} from "./types";

const Input = ({value, type, onChange, placeholder, label}: InputProps) => {
    return (
        <div className={styles.input}>
            <input type={type}
                   value={value}
                   onChange={onChange}
                   placeholder={placeholder}/>
            {label && <div className={styles.label}>{label}</div>}
        </div>
    );
};

export default Input;