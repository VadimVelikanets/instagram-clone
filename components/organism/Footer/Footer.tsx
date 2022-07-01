import React, {useEffect} from 'react';
import styles from "./Footer.module.scss";
import LanguageSelect from "../../atoms/LanguageSelect/LanguageSelect";
import useBreakpoint from "../../../hooks/useBreakpoint";

const Footer = () => {

    const breakpoint = useBreakpoint();

    return (
        <>
            {breakpoint.width > 960 ?  (
                <div className={styles.footer}>
                    <div className="container">
                        <div className={styles.footerWrapper}>
                            <LanguageSelect/>
                            <div className={styles.footerCopy}>© 2022 Instagram from Meta</div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>mobile</div>
            )}
        </>
    );
};

export default Footer;