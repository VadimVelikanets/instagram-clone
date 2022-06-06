import React from 'react';
import Portal from "../Portal/Portal";
import styles from './Modal.module.scss'
import {Props} from "./types";
import Image from "next/image";
const Modal = ({children, isOpen, onClose}: Props) => {
    if(!isOpen){
        return null
    }

    return (
        <Portal>
                <div className={styles.modal} onClick={onClose}>
                    <button className={styles.close} onClick={onClose}>
                        <Image src={'/images/icons/close.svg'} width={18} height={18}/>
                    </button>
                    <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                        {children}
                    </div>
                </div>
        </Portal>
    );
};

export default Modal;