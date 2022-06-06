import React from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from './PostItem.module.scss';
import {postItem} from "../../molecules/PostList/types";

const PostItem = ({ item} : postItem) => {
    return (
        <div className={styles.postItem}>
            <div className={styles.postItemBg}>
                <div className={styles.postItemMark}>
                    <div className={styles.postItemMarkItem}>
                        <div className={styles.postItemMarkItem}>
                            <span>
                                <svg aria-label="Комментировать" color="#ffffff" fill="#ffffff" height="24"
                                     role="img" viewBox="0 0 24 24" width="24">
                                <path d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z" fill="ffffff"
                                      stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                                </svg>
                            </span>
                            <span>10 тыс</span>
                        </div>


                    </div>
                    <div className={styles.postItemMarkItem}>
                        <span>
                            <svg aria-label="Не нравится" className="_8-yf5 " color="#ffffff" fill="#ffffff" height="24"
                                 role="img" viewBox="0 0 48 48" width="24">
                            <path
                                d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
                        </svg>
                        </span>
                        <span>10 тыс</span>
                    </div>
                </div>
            </div>

            {item.isVideo && <div className={styles.postItemVideo}>
                <svg aria-label="Видео" className="_8-yf5 " color="#ffffff" fill="#ffffff" height="18" role="img"
                     viewBox="0 0 24 24" width="18">
                    <path
                        d="M5.888 22.5a3.46 3.46 0 01-1.721-.46l-.003-.002a3.451 3.451 0 01-1.72-2.982V4.943a3.445 3.445 0 015.163-2.987l12.226 7.059a3.444 3.444 0 01-.001 5.967l-12.22 7.056a3.462 3.462 0 01-1.724.462z"></path>
                </svg>
            </div>
            }
            {item.imageUrls.length > 1 && (<div className={styles.postItemGalery}>
                <svg aria-label="Кольцевая галерея" className="_8-yf5 " color="#ffffff" fill="#ffffff" height="22"
                     role="img" viewBox="0 0 48 48" width="22">
                    <path
                        d="M34.8 29.7V11c0-2.9-2.3-5.2-5.2-5.2H11c-2.9 0-5.2 2.3-5.2 5.2v18.7c0 2.9 2.3 5.2 5.2 5.2h18.7c2.8-.1 5.1-2.4 5.1-5.2zM39.2 15v16.1c0 4.5-3.7 8.2-8.2 8.2H14.9c-.6 0-.9.7-.5 1.1 1 1.1 2.4 1.8 4.1 1.8h13.4c5.7 0 10.3-4.6 10.3-10.3V18.5c0-1.6-.7-3.1-1.8-4.1-.5-.4-1.2 0-1.2.6z"></path>
                </svg>
            </div>)}

            <Link href="/" >
                <Image loader={() => item.imageUrls[0]} src={item.imageUrls[0]} width="293" height="293" className={styles.postItemImage} />
            </Link>
        </div>

    );
};

export default PostItem;