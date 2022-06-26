import React, {useCallback, useEffect, useState} from 'react';
import {iPaginationProps} from "./types";

const Pagination = ({children, dataKey, data, isLoading, dataSize, loadNextDataCallback}: iPaginationProps) => {
    const [isMoreDataLoading, setMoreDataLoading] = useState(false);


    const loadNextData = useCallback(() => {
        if(dataKey && !isMoreDataLoading) {
            setMoreDataLoading(true)
            loadNextDataCallback()
        }

    },[dataKey, isLoading, data])

    useEffect(() => {
        setMoreDataLoading(false)
    }, [dataKey, data])

    useEffect(() => {

        function watchScroll() {
            window.addEventListener("scroll", loadNextData);
        }
        if(dataSize > data.length) {
            watchScroll();
        }
        return () => {
            window.removeEventListener("scroll", loadNextData);
        };
    }, [dataKey, data, isLoading]);

    return (
        <>
            {children}
        </>
    );
};

export default Pagination;