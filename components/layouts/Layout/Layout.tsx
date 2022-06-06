import React, {useEffect, useState} from 'react';
import Header from "../../organism/Header/Header";
import Footer from "../../organism/Footer/Footer";
import {useAppSelector} from "../../../hooks";
import {useDispatch} from "react-redux";
import {Props} from "./types";
import {getUser} from "../../../store/action-creators/user";
import MainLoader from "../../atoms/MainLoader/MainLoader";

const Layout: React.FC = ({children}: Props) => {
    const dispatch = useDispatch()
    const isLoading = useAppSelector(state => state.user?.isLoading)
    const uid = useAppSelector(state => state.user?.user?.uid)
    useEffect(() =>{
        let data = JSON.parse(localStorage.getItem('userData') || '{}')
        if(data) {
            dispatch(getUser(data))
        }

    },[]);

    if(isLoading) return <MainLoader/>

    return (
        <div className="layout">
            <Header uid={uid}/>
            <div className="content">
                <div className="layout-container ">
                    {children}
                </div>
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;