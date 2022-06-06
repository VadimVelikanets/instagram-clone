import React, {useEffect, useState, FC} from 'react';
import styles from './ProfileInfo.module.scss';
import Image from "next/image";
import Link from "next/link";
import {iProfileData} from "../../../store/types/profile";
import {useRouter} from "next/router";
import {useAppSelector} from "../../../hooks";
import Modal from '../../organism/Modal/Modal';
import {
    checkSubscription, getCurrentSubscribers, getCurrentSubscritions,
    getSubscriptionCount,
    subscribeToUser,
    unsubscribeToUser
} from '../../../pages/api/subscribe';
import FollowersModal from "../FollowersModal/FollowersModal";
import FollowingModal from "../FollowingModal/FollowingModal";

const ProfileInfo : FC<iProfileData>  = ({profileData}) => {
    const profile = useAppSelector(state => state.profile?.profile)
    const router = useRouter()
    const {query} = useRouter()
    const [isSubscribted, setIsSubscribted] = useState(false)
    const [subCount, setSubCount] = useState({
        subscriptions: 0,
        subscribers: 0
    })
    const subscribeHandler = () => {
        subscribeToUser(profileData.uid, profile?.uid)
        setIsSubscribted(true)
        setSubCount({...subCount, subscribers: subCount.subscribers + 1})
    }
    const unsubscribeHandler = () => {
        unsubscribeToUser(profileData.uid, profile?.uid)
        setIsSubscribted(false)
        setSubCount({ ...subCount, subscribers: subCount.subscribers - 1})
    }

    useEffect(()=> {
        if(profile?.nickname !== query.id){
            const check =  checkSubscription(profileData.uid, profile?.uid).then(data => setIsSubscribted(data))
        }
    }, [profile, query])

    useEffect(()=> {
        getSubscriptionCount(profileData.uid).then(data => setSubCount(data))
    },[query])

    return (
        <>
            <div className={styles.profileInfo}>
                <div className={styles.wrapper}>
                    <div className={styles.avatarWrapper}>
                        <Image src={(profileData && profileData?.photoUrl != null) ? profileData?.photoUrl: "/images/empty-avatar.png"}
                               loader={() => (profileData && profileData?.photoUrl != null) ? profileData?.photoUrl: "/images/empty-avatar.png"}
                               height="150" width="150" className={styles.avatar}/>
                    </div>
                    <div className={styles.info}>
                        <div className={styles.infoTop}>
                            <div className={styles.infoName}>
                                {profileData && profileData?.nickname}
                            </div>
                            {profile?.nickname == query.id ? (
                                <>
                                    <Link href="/account/edit" >
                                        <span className={styles.infoEdit}>
                                            Редактировать профиль
                                        </span>
                                    </Link>
                                    <button className={styles.infoSettings}>
                                        <svg aria-label="Параметры" className="_8-yf5 " color="#262626" fill="#262626" height="24"
                                             role="img" viewBox="0 0 24 24" width="24">
                                            <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor"
                                                    stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                            <path
                                                d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                                                fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                                        </svg>
                                    </button>
                                </>
                            ) : (isSubscribted ? ( <button  onClick={unsubscribeHandler}>
                                <span className={styles.subscribeBtn}>
                                    Отписаться
                                </span>
                                    </button>
                                ): ( <button  onClick={subscribeHandler}>
                                <span className={styles.subscribeBtn}>
                                    Подписаться
                                </span>
                                </button>)

                            )}
                        </div>
                        <div className={styles.infoData}>
                            <div className={styles.infoDataItem}><b>0</b> публикаций</div>
                            <Link
                                href={`${query.id}/?followers=${query.id}`}
                            >
                                <a className={styles.infoDataItem}>
                                    <b>{subCount.subscribers}</b> подписчик
                                </a>
                            </Link>
                            <Link
                                 href={`${query.id}/?following=${query.id}`}
                            >
                                <a className={styles.infoDataItem}>
                                    <b>{subCount.subscriptions}</b> подписок
                                </a>
                            </Link>
                        </div>
                        <div className={styles.infoUsername}>{profileData && profileData?.name}</div>
                    </div>
                </div>
            </div>
            <Modal isOpen={!!query?.following} onClose={() => router.push(query.id)}>
                <FollowingModal uid={profileData.uid}/>
            </Modal>
            <Modal isOpen={!!query?.followers} onClose={() => router.push(query.id)}>
                 <FollowersModal uid={profileData.uid}/>
            </Modal>
        </>

    );
};
export default ProfileInfo;