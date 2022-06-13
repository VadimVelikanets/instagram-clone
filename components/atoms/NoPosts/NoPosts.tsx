import React from 'react';
import  styles from './NoPosts.module.scss';
import Image from 'next/image';
import {useTranslation} from "react-i18next";

const NoPosts = () => {
    const {t} = useTranslation();

    return (
        <div className={styles.wrapper}>
            <Image src={'/images/icons/camera.png'} width={26} height={24}/>
            <div className={styles.title}>{t('profilePage.noPosts')}</div>
        </div>
    );
};

export default NoPosts;