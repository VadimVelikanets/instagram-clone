import React, {useEffect, useState} from 'react';
import EditPhoto from "../../atoms/EditPhoto/EditPhoto";
import styles from './EditForm.module.scss';
import {getProfileData} from "../../../pages/api/profile";
import {useAppSelector} from "../../../hooks";
import {iProfileData} from "../../../store/types/profile";
import {useDispatch} from "react-redux";
import {updateProfile} from "../../../store/action-creators/profile";
import Button from "../../atoms/Button/Button";
import MainLoader from "../../atoms/MainLoader/MainLoader";

const EditForm = () => {
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState<iProfileData>()
    const [isDisableSubmit, setDisableSubmit] = useState(false);

    const user = useAppSelector(state => state?.user?.user)

    useEffect(() => {
        getProfileData(user?.uid).then(data => setProfileData(data))
    }, [])

    useEffect(()=> {
        if(profileData?.name == '' || profileData?.nickname == ''){
            setDisableSubmit(true)
        } else {
            setDisableSubmit(false)
        }
    }, [profileData])

    const editProfileHandler = () => {
        setDisableSubmit(true)
        dispatch(updateProfile(profileData))
        setDisableSubmit(false)
        alert('Updated')
    }

    if(!profileData) return <MainLoader/>
    return (
        <div className={styles.form}>
            <EditPhoto profileData={profileData}/>
            <div className={styles.inputWrapper}>
                <aside className={styles.aside}>Name</aside>
                <input type="text" placeholder="name" value={profileData?.name}
                       onChange={e => setProfileData({...profileData, name: e.target.value})}
                />
            </div>
            <div className={styles.inputWrapper}>
                <aside className={styles.aside}>Nickname</aside>
                <input type="text" placeholder="nickname" value={profileData?.nickname}
                       onChange={e => setProfileData({...profileData, nickname: e.target.value})}
                />
            </div>
            <div className={styles.inputWrapper}>
                <aside className={styles.aside}>Website</aside>
                <input type="text" placeholder="website" value={profileData?.website}
                       onChange={e => setProfileData({...profileData, website: e.target.value})}
                />
            </div>
            <div className={styles.inputWrapper}>
                <aside className={styles.aside}>About</aside>
                <textarea placeholder="about" value={profileData?.about}
                          onChange={e => setProfileData({...profileData, about: e.target.value})}
                ></textarea>
            </div>
            <div className={styles.inputWrapper}>
                <aside className={styles.aside}>Email</aside>
                <input type="email" placeholder="email" value={profileData?.email}
                       onChange={e => setProfileData({...profileData, email: e.target.value})}
                />
            </div>
            <div className={styles.inputWrapper}>
                <aside className={styles.aside}></aside>
                <Button disabled={isDisableSubmit} btnEvent={editProfileHandler} text="Submit" className={`${styles.submit} submit my-3 bg-blue-400 text-white py-1 px-4 rounded-md`} />
            </div>
        </div>
    );
};

export default EditForm;