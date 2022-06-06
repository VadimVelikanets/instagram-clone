import React from 'react';
import styles from './PostList.module.scss';
import Image from 'next/image';
import {postItem} from "./types";
import PostItem from "../../atoms/PostItem/PostItem";

const PostList = () => {

    const postLists: postItem[] = [
        {
            uid: 'vados',
            imageUrls: [
                'https://jpeg.org/images/jpeg-home.jpg'
            ],
            isVideo: true,
            comments: '120 тыс',
            likes: '10 тыс'
        },
        {
            uid: 'vados',
            imageUrls: [
                'https://jpeg.org/images/jpeg-home.jpg'
            ],
            isVideo: false,
            comments: '120 тыс',
            likes: '10 тыс'
        },
        {
            uid: 'vados',
            imageUrls: [
                'https://jpeg.org/images/jpeg-home.jpg',
                'https://jpeg.org/images/jpeg-home.jpg',
            ],
            isVideo: false,
            comments: '120 тыс',
            likes: '10 тыс'
        },
        {
            uid: 'vados',
            imageUrls: [
                'https://jpeg.org/images/jpeg-home.jpg'
            ],
            isVideo: true,
            comments: '120 тыс',
            likes: '10 тыс'
        },
        {
            uid: 'vados',
            imageUrls: [
                'https://jpeg.org/images/jpeg-home.jpg'
            ],
            isVideo: false,
            comments: '120 тыс',
            likes: '10 тыс'
        },
        {
            uid: 'vados',
            imageUrls: [
                'https://jpeg.org/images/jpeg-home.jpg',
                'https://jpeg.org/images/jpeg-home.jpg',
            ],
            isVideo: false,
            comments: '120 тыс',
            likes: '10 тыс'
        },
        {
            uid: 'vados',
            imageUrls: [
                'https://jpeg.org/images/jpeg-home.jpg'
            ],
            isVideo: true,
            comments: '120 тыс',
            likes: '10 тыс'
        },
        {
            uid: 'vados',
            imageUrls: [
                'https://jpeg.org/images/jpeg-home.jpg'
            ],
            isVideo: false,
            comments: '120 тыс',
            likes: '10 тыс'
        },
        {
            uid: 'vados',
            imageUrls: [
                'https://jpeg.org/images/jpeg-home.jpg',
                'https://jpeg.org/images/jpeg-home.jpg',
            ],
            isVideo: false,
            comments: '120 тыс',
            likes: '10 тыс'
        },
    ]

    return (
        <div className={styles.postList}>
            {postLists.map((item, index) => (
                <PostItem item={item}/>
            ))}
        </div>
    );
};

export default PostList;