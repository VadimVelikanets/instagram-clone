import React, {FC} from 'react';
import styles from './Switch.module.scss';
import {iSwitch} from "./types";

const Switch : FC<iSwitch> = ({onChange, checked}) => {
    return (
        <label className={styles.switch}>
            <input type="checkbox" checked={checked} onChange={onChange}/>
            <span></span>
        </label>
    );
};

export default Switch;