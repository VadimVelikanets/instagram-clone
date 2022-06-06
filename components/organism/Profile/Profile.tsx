import React, {useEffect, FC} from 'react';
import {useAppSelector} from "../../../hooks";
import {useRouter} from "next/router";
import ProfileInfo from "../../molecules/ProfileInfo/ProfileInfo";
import PostList from "../../molecules/PostList/PostList";
import MainLoader from "../../atoms/MainLoader/MainLoader";
import {iProfileData} from "../../../store/types/profile";
import {fetchProfile} from "../../../store/action-creators/profile";
import {useDispatch} from "react-redux";

const Profile: FC<iProfileData>  = ({profileData}) => {
    const user = useAppSelector(state => state.user?.user)
    const profile = useAppSelector(state => state)
    const router = useRouter()
    const dispatch = useDispatch();
    useEffect(() => {
        if(user === null) {
            router.push('/account/login')
        }
        dispatch(fetchProfile(user.uid))
    }, [])

    if(user === null) return <MainLoader/>
    return (
        <div>
            <ProfileInfo profileData={profileData}/>
            <PostList/>
        </div>
    );
};

export default Profile;