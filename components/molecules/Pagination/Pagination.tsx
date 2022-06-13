import React, {useCallback, useEffect} from 'react';
import {iPaginationProps} from "./types";
import {getMorePostsById} from "../../../store/action-creators/posts";

const Pagination = ({children, postKey, data, isLoading, postSize}: iPaginationProps) => {

    const loadNextPosts = useCallback(() => {
        // if (postKey && !isLoading) {
        //     setLoading(true)
        //     dispatch(getMorePostsById(uid, postKey))
        // }
    },[postKey, isLoading, data])

    useEffect(() => {
        function watchScroll() {
            window.addEventListener("scroll", loadNextPosts);
        }
        if(postSize > data.length) {
            watchScroll();
        }

        return () => {
            window.removeEventListener("scroll", loadNextPosts);
        };
    }, [postKey, data, isLoading]);
    return (
        <>
            {children}
        </>
    );
};

export default Pagination;