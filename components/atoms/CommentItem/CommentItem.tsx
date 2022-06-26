import React, {useEffect, useState} from 'react';
import styles from './CommentItem.module.scss'
import {getProfileData} from "../../../pages/api/profile";
import Link from "next/link";
import Image from "next/image";
import {dateFormat} from "../../../utils/dateFormat";
import {commentItemProps} from "./types";
import findUserInText from "../../../utils/findUserInText";
import {useTranslation} from "react-i18next";

const CommentItem = ({item, replyUser} : commentItemProps) => {
    const {t} = useTranslation();
    const [profileData, setProfileData] = useState(null)
    const [textData, setTextData] = useState(null)
    useEffect(() => {
        getProfileData(item?.uid).then((data) => setProfileData(data))
    }, [])

    const createdAt =  dateFormat(item?.createdAt)

    const replyUserHandler = () => {
        replyUser(profileData?.nickname)
    }

    useEffect(() => {
        setTextData(findUserInText(item?.text))

    },[])

    return (
        <div className={styles.comment}>
            <Link href={`/${profileData?.nickname}`}>
                <Image
                    src={profileData?.photoUrl ? profileData?.photoUrl : "/images/empty-avatar.png"}
                    loader={() => (profileData && profileData?.photoUrl != null) ? profileData?.photoUrl : "/images/empty-avatar.png"}
                    width={32}
                    height={32}
                    className={styles.avatar}
                />
            </Link>
            <div className={styles.commentText}>
                <Link href={`/${profileData?.nickname}`}>
                    <a className={styles.name}>
                        { profileData?.nickname}
                    </a>
                </Link>
                <span> &nbsp; {textData?.nickname && <Link href={`/${textData?.nickname}`}>
                    <a className={styles.nickname}>
                        @{textData?.nickname}
                    </a>
                </Link>} {textData?.text}
                </span>
                <div className={styles.footer}>
                    <div className={styles.date}>{createdAt}</div>
                    <div className={styles.reply} onClick={replyUserHandler}>{t('postPage.comments.reply')}</div>
                </div>
            </div>
        </div>
    );
};

export default React.memo(CommentItem);