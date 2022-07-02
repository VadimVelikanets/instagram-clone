import React, {useEffect, useState} from 'react';
import Header from "../../organism/Header/Header";
import Footer from "../../organism/Footer/Footer";
import {useAppSelector} from "../../../hooks";
import {useDispatch} from "react-redux";
import {Props} from "./types";
import {getUser} from "../../../store/action-creators/user";
import MainLoader from "../../atoms/MainLoader/MainLoader";
import {useRouter} from "next/router";

const Layout: React.FC = ({children}: Props) => {
    const dispatch = useDispatch()
    const router = useRouter()
    const [isLoading, setLoading] = useState<boolean>(true)
    const uid = useAppSelector(state => state.user?.user?.uid)
    useEffect(() =>{
        let data = JSON.parse(localStorage.getItem('userData') || '{}')
        if(Object.keys(data).length) {
            dispatch(getUser(data))
        } else {
            router.push('/account/login')
        }
        setLoading(false)
    },[]);

    if(isLoading) return <MainLoader/>

    return (
        <>
            <div className="layout">
                {uid &&  <Header uid={uid}/>}
                <div className="content">
                    <div className="layout-container ">
                        {children}
                    </div>
                </div>
                <Footer uid={uid}/>
            </div>
        </>

    );
};

export default Layout;