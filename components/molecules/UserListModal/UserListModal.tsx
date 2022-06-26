import React, {FC, useEffect, useState} from 'react';
import styles from './UserListModal.module.scss'
import {iUserListModal} from './types';
import Image from "next/image";
import Link from "next/link";
import {useTranslation} from "react-i18next";
import Loader from "../../atoms/Loader/Loader";

const UserListModal : FC<iUserListModal> = ({id, title, getUserListData}) => {
    const {t} = useTranslation();
    const [data, setData] = useState<[]>([])
    const [isLoading, setLoading] = useState<boolean>(true)
    useEffect(()=>{
        getUserListData(id)
            .then(res => setData(res)).then(() => setLoading(false))
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>{title}</div>
            {isLoading ? (
                <div className={styles.loader}>
                    <Loader/>
                </div>
            ) : (
                <div className={styles.list}>
                    {data.length && data.map((item) => (
                        <div key={item.nickname} className={styles.item}>
                            <Link href={item?.nickname}>
                                <a className={styles.avatarLink}>
                                    <Image src={(item && item?.photoUrl != null) ? item?.photoUrl: "/images/empty-avatar.png"}
                                           loader={() => (item && item?.photoUrl != null) ? item?.photoUrl: "/images/empty-avatar.png"}
                                           height="30" width="30" className={styles.avatar}/>
                                </a>
                            </Link>
                            <div className={styles.itemInner}>
                                <Link href={item?.nickname}><a className={styles.itemLink}>{item?.nickname}</a></Link>
                                <div className={styles.itemName}>{item?.name}</div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

        </div>
    );
};

export default UserListModal;