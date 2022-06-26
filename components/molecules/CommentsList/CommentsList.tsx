import React, {useCallback, useEffect, useState} from 'react';
import styles from './CommentsList.module.scss';
import {getCommentsByPost, getCommentsSize, getMoreCommentsByPost} from "../../../pages/api/comments";
import {CommentsListProps} from "./types";
import Loader from "../../atoms/Loader/Loader";
import {useTranslation} from "react-i18next";
import CommentItem from "../../atoms/CommentItem/CommentItem";

const CommentsList = ({postId, isCommentAdd, replyUser}: CommentsListProps) => {
    const {t} = useTranslation();
    const [comments, setComments] = useState<null | object[]>(null)
    const [isLoading, setLoading] = useState<boolean>(true)
    const [commentsKey, setCommentsKey] = useState(null);
    const [commentsSize, setCommentsSize] = useState<number>(0)
    useEffect(() => {
        getCommentsByPost(postId)
            .then(data => {
                setCommentsKey(data?.[data?.length - 1]?.createdAt)
                setComments(data)
            })
            .then(() => setLoading(false))

    }, [isCommentAdd])

    useEffect(()=> {
        getCommentsSize(postId).then(data => setCommentsSize(data))
        setCommentsKey(comments?.[comments?.length - 1]?.createdAt)
    }, [postId, comments, commentsKey, isCommentAdd])

    const loadNextComments = useCallback(()=>{
        setLoading(true)
        getMoreCommentsByPost(postId, commentsKey)
            .then(res => setComments(prevState => [...prevState, ...res]))
            .then(()=> setLoading(false))
    },[isLoading, comments, commentsKey])

    const replyUserEvent = (nickname: string) => {
        replyUser(nickname)
    }

    return (
        <>
            {(isLoading && !comments?.length) ? (
                <div className={styles.loader}>
                    <Loader/>
                </div>
            ) : (
                comments?.length ? (
                    <div className={styles.list}>
                        {comments.map(item => <CommentItem key={item?.createdAt}
                                                           item={item}
                                                           replyUser={replyUserEvent} />
                        )}

                        {comments?.length !== commentsSize && (
                            <div className={styles.more}>
                                <svg onClick={loadNextComments} aria-label="Загрузить ещё комментарии" className="_ab6-" color="#262626" fill="#262626"
                                     height="24" role="img" viewBox="0 0 24 24" width="24">
                                    <circle cx="12.001" cy="12.005" fill="none" r="10.5" stroke="currentColor"
                                            stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></circle>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" x1="7.001" x2="17.001" y1="12.005" y2="12.005"></line>
                                    <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                          stroke-width="2" x1="12.001" x2="12.001" y1="7.005" y2="17.005"></line>
                                </svg>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className={styles.nocomments}>
                        <div  className={styles.nocommentsTitle}>{t('postPage.comments.noCommentsTitle')}</div>
                        <span className={styles.nocommentsText}>{t('postPage.comments.noCommentsText')}</span>
                    </div>
                )
            )}
            {isLoading &&
                <div className={styles.loader}>
                    <Loader/>
                </div>
            }
        </>
    );
};

export default CommentsList;