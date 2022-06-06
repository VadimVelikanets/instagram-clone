import React, {FC} from 'react';
import styles from './ConfirmModal.module.scss'
import {iConfirm} from "./types";

const ConfirmModal: FC<iConfirm> = ({title, text, btnConfirm, btnCancel, confirmEvent, cancelEvent}) => {
    return (
        <div className={styles.confirm}>
            <div className={styles.head}>
                <div className={styles.title}>{title}</div>
                <div className={styles.text}>{text}</div>
            </div>

            <div className={styles.btns}>
                <button className={`${styles.btnConfirm} ${styles.btn}`}
                    onClick={confirmEvent}
                >{btnConfirm}</button>
                <button className={`${styles.btnCancel} ${styles.btn}`}
                        onClick={cancelEvent}
                >{btnCancel}</button>
            </div>
        </div>
    );
};

export default ConfirmModal;