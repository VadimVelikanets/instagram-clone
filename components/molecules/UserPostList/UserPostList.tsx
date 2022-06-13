import React, {useCallback, useEffect, useState} from 'react';
import styles from './UserPostList.module.scss';
import {iPostItem, iUserPostListProps} from "./types";
import PostItem from "../../atoms/PostItem/PostItem";
import NoPosts from "../../atoms/NoPosts/NoPosts";
import {useDispatch} from "react-redux";
import {getMorePostsById, getPostsById} from "../../../store/action-creators/posts";
import {getPostsSize} from "../../../pages/api/post";
import {useAppSelector} from "../../../hooks";
import Loader from "../../atoms/Loader/Loader";

const UserPostList = ({uid}: iUserPostListProps) => {
    const dispatch = useDispatch()
    const [postList, setPostList] = useState(null);
    const [postKey, setPostKey] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [postSize, setPostSize] = useState(0);
    const postData = useAppSelector(state => state.posts?.posts?.[uid])

    useEffect(() => {
        dispatch(getPostsById(uid))
        getPostsSize(uid).then(data => setPostSize(data))
    }, [uid])

    useEffect(() =>{
        setPostList(postData?.data)
        setPostKey(postData?.data[postData?.data.length - 1]?.createdAt)
        setLoading(postData?.isLoading)
        setPostList(postData?.data)
    }, [postData, postList, postKey])

    const loadNextPosts = useCallback(() => {
          if (postKey && !isLoading) {
              setLoading(true)
              dispatch(getMorePostsById(uid, postKey))
          }
    },[postKey, isLoading, postData])

    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", loadNextPosts);
        }
        if(postSize > postData?.data.length) {
            watchScroll();
        }

        return () => {
            window.removeEventListener("scroll", loadNextPosts);
        };
    }, [postKey, postList, isLoading]);

    if(isLoading && !postData?.data.length) return (
        <div className={styles.wrapper}>
            <Loader/>
        </div>
    )
    return (
        <div className={styles.postList}>
            {(postData?.data && postData?.data.length) ? (postData?.data.map((item) => (
                <PostItem key={item.createdAt} item={item}/>
            ))) : (
                <NoPosts/>
            )
            }
            {isLoading &&
                <div className={styles.wrapper}>
                    <Loader/>
                </div>
            }
        </div>
    );
};

export default UserPostList;