import React, {FC, useEffect, useState} from 'react';
import styles from './FollowersModal.module.scss'
import {getCurrentSubscribers} from "../../../pages/api/subscribe";
import {IFollowersModal} from './types';
import Image from "next/image";
import Link from "next/link";
const FollowersModal : FC<IFollowersModal> = ({uid}) => {

    const [followers, setFollowers] = useState([])
    useEffect(()=>{
        getCurrentSubscribers(uid).then(data => setFollowers(data))
    }, [])

    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>Подписки</div>
            <div className={styles.list}>
               {followers.length ? followers.map((item, index) => (
                   <div className={styles.item}>
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
               )) : (
                   <p className={styles.empty}>Здесь будут отображаться  подписчики.</p>
               )}
           </div>
        </div>
    );
};

export default FollowersModal;