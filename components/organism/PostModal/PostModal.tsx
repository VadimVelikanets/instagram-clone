import React, {useEffect, useState} from 'react';
import styles from './PostModal.module.scss';
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import {iPostItem} from "../../molecules/UserPostList/types";
import {getPostById} from "../../../pages/api/post";
import {useRouter} from "next/router";
import PostSlider from "../../molecules/PostSlider/PostSlider";
import {getProfileData} from "../../../pages/api/profile";
import {useTranslation} from "react-i18next";
import {addLikeToPost, checkYourLike, deleteLikeToPost, getCurrentLikes} from "../../../pages/api/likes";
import Modal from "../Modal/Modal";
import {useAppSelector} from "../../../hooks";
import UserListModal from "../../molecules/UserListModal/UserListModal";
import CommentsList from "../../molecules/CommentsList/CommentsList";
import {dateFormat} from "../../../utils/dateFormat";
const CommentForm = dynamic(()=> import("../../molecules/CommentForm/CommentForm"), {ssr: false})

const PostModal = ({item} : iPostItem) => {
    const {query} = useRouter()
    const {t} = useTranslation()
    const [postData, setPostData] = useState(null);
    const [postAuthor, setPostAuthor] = useState(null);
    const [isYourLike, setYourLike] = useState(false);
    const [likes, setLikes] = useState(0)
    const [showLikesModal, setShowLikesModal] = useState(false)
    const [isCommentAdd, setCommentAdd] = useState<boolean>(false)
    const [repliedUser, setRepliedUser] = useState<string>('')
    const uid = useAppSelector(state => state.profile?.profile?.uid)

    const getPostAuthor = (uid: string) => {
        getProfileData(uid).then(res => setPostAuthor(res))
    }

    useEffect(() => {
                getPostById(query?.p)
                    .then(data => setPostData(data))
                    .then(getPostAuthor(postData?.uid))
    }, [query])

    useEffect(() => {
         checkYourLike(uid, query?.p).then(res => setYourLike(res))
    }, [query, uid])

    useEffect(() => {
        getPostAuthor(postData?.uid)
        setLikes(postData?.likes)
    }, [postData])

    const likeHandler = () => {
        if(isYourLike) {
            deleteLikeToPost(uid, query?.p)
                .then(res => setYourLike(false))
                .then(setLikes(likes - 1))
        } else {
            addLikeToPost(uid, query?.p)
                .then(res => setYourLike(true))
                .then(setLikes(likes + 1))
        }
    }

    const createdAt = dateFormat(postData?.createdAt)
    const likesModalHandler = () => {
        if(likes > 0) {
            setShowLikesModal(true)
        }
    }

    const replyUserEvent = (nickname: string) => {
        setRepliedUser(nickname)
    }

    return (
        <>
            <div className={styles.post}>
                <div className={styles.slider}>
                    <PostSlider>
                        {postData?.imagesUrls && postData?.imagesUrls.map((item) => (
                            <Image key={item}
                                   src={item}
                                   loader={() => (postData && item != null) ? item: "/images/empty-avatar.png"}
                                   width="100%"
                                   height="100%"
                                   layout="responsive"
                                   objectFit="cover"/>
                        ))}
                    </PostSlider>
                </div>
                <div className={styles.inner}>
                    <div className={styles.head}>
                        <Link href={`/${postAuthor?.nickname}`}>
                            <Image
                                src={postAuthor?.photoUrl ? postAuthor?.photoUrl : "/images/empty-avatar.png"}
                                loader={() => (postAuthor && postAuthor?.photoUrl != null) ? postAuthor?.photoUrl : "/images/empty-avatar.png"}
                                width={32}
                                height={32}
                                className={styles.avatar}
                            />
                        </Link>
                        <div className={styles.headInner}>
                            <Link href={`/${postAuthor?.nickname}`}>
                                <a className={styles.name}>
                                    { postAuthor?.nickname}
                                </a>
                            </Link>
                            {postData?.place && <div className={styles.place}>{postData?.place}</div>}
                        </div>

                    </div>
                    <div className={styles.comments}>
                        <div className={styles.comment}>
                            <Link href={`/${postAuthor?.nickname}`}>
                                <Image
                                    src={postAuthor?.photoUrl ? postAuthor?.photoUrl : "/images/empty-avatar.png"}
                                    loader={() => (postAuthor && postAuthor?.photoUrl != null) ? postAuthor?.photoUrl : "/images/empty-avatar.png"}
                                    width={32}
                                    height={32}
                                    className={styles.avatar}
                                />
                            </Link>
                            <div className={styles.commentText}>
                            <Link href={`/${postAuthor?.nickname}`}>
                                <a className={styles.name}>
                                    { postAuthor?.nickname}
                                </a>
                            </Link>
                                <span> &nbsp; {postData?.description}</span>
                            </div>
                        </div>
                        {!item.isOffComments && (
                            <CommentsList postId={query?.p}
                                          isCommentAdd={isCommentAdd}
                                          replyUser={replyUserEvent}
                            />
                        )}
                    </div>
                    <div className={styles.footer}>
                        <div className={styles.like} onClick={likeHandler}>
                            {isYourLike ? (
                                <span>
                                <svg aria-label="Не нравится" className="_ab6-" color="#ed4956" fill="#ed4956"
                                     height="24" role="img" viewBox="0 0 48 48" width="24"><path
                                    d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path></svg>
                            </span>
                            ): (
                                <span>
                                <svg aria-label="Нравится" className="_ab6-" color="#262626" fill="#262626" height="24"
                                     role="img" viewBox="0 0 24 24" width="24"><path
                                    d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path></svg>
                            </span>
                            )}
                        </div>
                        {!item?.isOffLikes && (
                            <div className={styles.likesInfo}
                                 onClick={likesModalHandler}
                            >{likes} {t('postPage.likesCount')}</div>
                        )}
                        <div className={styles.date}>{createdAt}</div>
                    </div>
                    {!item.isOffComments && (
                        <CommentForm repliedUser={repliedUser}
                                  postId={query?.p} uid={uid}
                                  setCommentAdd={setCommentAdd} />
                    )}
                </div>
            </div>
            <Modal isOpen={showLikesModal} onClose={() =>  setShowLikesModal(false)}>
                <UserListModal id={query?.p}
                               title={t('postPage.likesTitle')}
                               getUserListData={() =>getCurrentLikes(query?.p)}
                />
            </Modal>
        </>
    );
};

export default PostModal;