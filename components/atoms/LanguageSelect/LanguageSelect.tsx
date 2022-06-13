import React from 'react';
import styles from './LanguageSelect.module.scss';

import '../../../config/i18next';
import {useTranslation} from "react-i18next";
import {availableLanguages} from "../../../config/i18next";

const LanguageSelect = () => {
    const {t, i18n} = useTranslation()
    return (
        <select defaultValue={i18n.language} onChange={(e) => i18n.changeLanguage(e.target.value)} className={styles.select}>
            {availableLanguages.map((language) => (
                <option key={language}>{language}</option>
            ))}
        </select>
    );
};

export default LanguageSelect;