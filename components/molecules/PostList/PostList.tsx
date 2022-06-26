import React, {useCallback, useEffect, useState} from 'react';
import styles from './PostList.module.scss';
import {iUserPostListProps} from "./types";
import PostItem from "../../atoms/PostItem/PostItem";
import NoPosts from "../../atoms/NoPosts/NoPosts";
import {useDispatch} from "react-redux";
import {getMorePostsById, getPostsById} from "../../../store/action-creators/posts";
import {getAllPosts, getAllPostsMore, getAllPostsSize, getPostsSize} from "../../../pages/api/post";
import {useAppSelector} from "../../../hooks";
import Loader from "../../atoms/Loader/Loader";
import Pagination from "../Pagination/Pagination";

const PostList = () => {
    const [postList, setPostList] = useState(null);
    const [postKey, setPostKey] = useState(null);
    const [isLoading, setLoading] = useState(true);
    const [postSize, setPostSize] = useState<number>(0);

    useEffect(() => {
        getAllPosts().then(data => {
            setPostList(data)
            setPostKey(data?.[data?.length - 1]?.createdAt)
            setLoading(false)
        })
        getAllPostsSize().then(data => setPostSize(data))
    }, [])

    useEffect(() =>{
        setPostList(postList)
    }, [ postList, postKey])

    const loadNextPosts = useCallback(() => {
              setLoading(true)
              getAllPostsMore(postKey)
                  .then(res => setPostList(prevState => [...prevState, ...res]))
                  .then(()=> setLoading(false))

    },[postKey, isLoading, postList])

    if(isLoading && !postList?.length) return (
        <div className={styles.wrapper}>
            <Loader/>
        </div>
    )
    return (
        <div className={styles.postList}>
            {(postList && postList?.length) ? (
                <Pagination dataKey={postKey}
                          data={postList}
                          isLoading={isLoading}
                          dataSize={postSize}
                          loadNextDataCallback={loadNextPosts}>
                    {postList.map((item) => (
                    <PostItem key={item.createdAt} item={item}/>
                    ))}
                </Pagination>
                ) : (
                <NoPosts/>
            )}
            {isLoading &&
                <div className={styles.wrapper}>
                    <Loader/>
                </div>
            }
        </div>
    );
};

export default PostList;