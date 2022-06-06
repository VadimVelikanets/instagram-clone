import React from 'react';
import styles from './MainLoader.module.scss';
import Image from "next/image";
const MainLoader = () => {
    return (
        <div className={styles.loader}>
            <Image src="/images/icons/logo-loader.png" width="60" height="60"/>
        </div>
    );
};

export default MainLoader;