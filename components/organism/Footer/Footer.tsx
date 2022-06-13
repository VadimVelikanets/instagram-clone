import React from 'react';
import styles from "./Footer.module.scss";
import LanguageSelect from "../../atoms/LanguageSelect/LanguageSelect";

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className="container">
                <div className={styles.footerWrapper}>
                    <LanguageSelect/>
                    <div className={styles.footerCopy}>© 2022 Instagram from Meta</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;