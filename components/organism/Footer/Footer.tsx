import React from 'react';
import styles from "./Footer.module.scss";
const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className="container">
                <div className={styles.footerWrapper}>
                    <div className={styles.footerCopy}>© 2022 Instagram from Meta</div>
                </div>
            </div>
        </div>
    );
};

export default Footer;