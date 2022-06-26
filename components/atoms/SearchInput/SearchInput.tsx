import React, {useEffect, useState} from 'react';
import styles from './SearchInput.module.scss';
import classNames from 'classnames';
import {searchUser} from "../../../pages/api/search";
import Image from "next/image";
import {useTranslation} from "react-i18next";
import Loader from "../Loader/Loader";
import Link from "next/link";
const SearchInput = () => {
    const {t} = useTranslation();
    const [value, setValue] = useState<string>('');
    const [isFocused, setFocused] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [searchData, setSearchData] = useState(null);

    const onSearchHandler = (e: React.ChangeEventHandler<HTMLInputElement>) => {
        setValue(e.target.value)
    }

    useEffect(() => {
        if(value.length > 0) {
            setLoading(true)
             searchUser(value)
                 .then(res => {
                     setSearchData(res)
                     setLoading(false)
                     console.log(searchData)
                 })

        } else {
            setSearchData(null)
        }
    }, [value])

    return (
        <>
            <div className={styles.search}>
                <div className={classNames(styles.wrapper, { ["focused"] : isFocused })}>
            <span className={styles.searchIcon}>
                <svg aria-label="Поиск" className="_ab6-" color="#8e8e8e" fill="#8e8e8e" height="16" role="img"
                     viewBox="0 0 24 24" width="16"><path d="M19 10.5A8.5 8.5 0 1110.5 2a8.5 8.5 0 018.5 8.5z"
                                                          fill="none" stroke="currentColor" stroke-linecap="round"
                                                          stroke-linejoin="round" stroke-width="2"></path><line
                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    x1="16.511" x2="22" y1="16.511" y2="22"></line></svg>
            </span>
                    <input className={styles.input}
                           type="text"
                           onFocus={() => setFocused(true)}
                           onBlur={() => setFocused(false)}
                           value={value}
                           placeholder={t('header.search.search')}
                           onChange={e => onSearchHandler(e)} />
                    {(isFocused && !isLoading) && (
                        <span className={styles.close} onMouseDown={() => setValue('')}>
                           <Image src="/images/icons/close-button.svg" width={16} height={16}/>
                </span>
                    )}
                    { isLoading && (
                        <div className={styles.loader}>
                            <Loader/>
                        </div>
                    )}
                </div>
                {isFocused && (
                    <div className={styles.dropdown}>
                        {isLoading ? (
                            <div className={styles.dropdownText}><Loader/></div>
                        ) : (
                            searchData ? (
                                searchData.length === 0 ? (
                                    <div className={styles.dropdownText}>{t('header.search.notFound')}</div>
                                ) : (
                                    searchData.map(item => (
                                        <Link href={`/${item?.nickname}`} key={item.uid}>
                                            <a className={styles.user}>
                                                <Image
                                                    src={item?.photoUrl ? item?.photoUrl : "/images/empty-avatar.png"}
                                                    loader={() => (item && item?.photoUrl != null) ? item?.photoUrl : "/images/empty-avatar.png"}
                                                    width={54}
                                                    height={54}
                                                    className={styles.avatar}
                                                />
                                                <div className={styles.userData}>
                                                    <div className={styles.userNickname}>{item?.nickname}</div>
                                                    <div className={styles.userName}>{item?.nickname}</div>
                                                </div>

                                            </a>
                                        </Link>
                                    )))
                            ) : (
                            <div className={styles.recent}>
                                <span className={styles.recentTitle}>{t('header.search.recent')}</span>
                                <div className={styles.recentText}>
                    <span>
                        {t('header.search.noRecent')}
                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default SearchInput;