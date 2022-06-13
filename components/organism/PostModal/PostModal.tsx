import React, {useEffect, useState} from 'react';
import styles from './PostModal.module.scss';
import Image from "next/image";
import {iPostItem} from "../../molecules/UserPostList/types";
import {getPostById} from "../../../pages/api/post";
import {useRouter} from "next/router";
import PostSlider from "../../molecules/PostSlider/PostSlider";
import {getProfileData} from "../../../pages/api/profile";

const PostModal = ({item} : iPostItem) => {
    const {query} = useRouter()
    const router = useRouter()
    const [postData, setPostData] = useState(null);
    const [postAuthor, setPostAuthor] = useState(null);

    const getPostAuthor = (uid: string) => {
        getProfileData(uid).then(res => setPostAuthor(res))
    }

    useEffect(() => {
                getPostById(query?.p)
                    .then(data => setPostData(data))
                    .then(getPostAuthor(postData?.uid))
    }, [item, query])

    useEffect(() => {
        getPostAuthor(postData?.uid)
    }, [postData])

    console.log(postAuthor)

    return (
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
                    <Image
                        src={postAuthor?.photoUrl ? postAuthor?.photoUrl : "/images/empty-avatar.png"}
                        loader={() => (postAuthor && postAuthor?.photoUrl != null) ? postAuthor?.photoUrl : "/images/empty-avatar.png"}
                        width={32}
                        height={32}
                        className={styles.avatar}
                    />
                    <div className={styles.name}>
                        { postAuthor?.name}
                    </div>
                </div>
                <div className={styles.comments}>
                    <div className={styles.comment}>
                        <Image
                            src={postAuthor?.photoUrl ? postAuthor?.photoUrl : "/images/empty-avatar.png"}
                            loader={() => (postAuthor && postAuthor?.photoUrl != null) ? postAuthor?.photoUrl : "/images/empty-avatar.png"}
                            width={32}
                            height={32}
                            className={styles.avatar}
                        />
                        <div className={styles.commentText}>
                            <span className={styles.name}>
                                { postAuthor?.name}
                            </span>
                            <span> &nbsp; {postData?.description}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PostModal;