import React, {useEffect, useRef, useState} from 'react';
import Image from "next/image";
import Link from "next/link";
import styles from "./ProfileDropdown.module.scss";
import {getProfileData} from "../../../pages/api/profile";
import {logoutUser} from "../../../store/action-creators/user";
import {useRouter} from "next/router";
import {useDispatch} from "react-redux";
import {useOutsideClick} from "../../../hooks";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import Modal from "../../organism/Modal/Modal";
import {useTranslation} from "react-i18next";
const ProfileDropdown = ({uid}) => {
    const router = useRouter();
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const [profileData, setProfileData] = useState(null)
    const [isShowDropdown, setShowdropdown] = useState<boolean>(false)
    const [showConfirmCloseModal, setConfirmCloseModal] = useState(false)
    const handleClickOutside = () => {
        setShowdropdown(false)
    }

    const box = useRef(null)
     useOutsideClick(box, handleClickOutside)

    useEffect(() => {
        if(uid) {
            getProfileData(uid).then(data => setProfileData(data))
        }

    }, [])

    const logoutHandler = () => {
        dispatch(logoutUser());
        router.push('/account/login')
    }

    return (
        <>
            <div ref={box} className={styles.wrapper} onClick={() => setShowdropdown(!isShowDropdown)}>
            <Image
                src={profileData?.photoUrl ? profileData?.photoUrl : "/images/empty-avatar.png"}
                loader={() => (profileData && profileData?.photoUrl != null) ? profileData?.photoUrl : "/images/empty-avatar.png"}
                width={24}
                height={24}
                className={styles.avatar}
            />
            {isShowDropdown && (
                <div className={styles.dropdown}>
                    <Link href={`/${profileData?.nickname}`}>
                        <a className={styles.dropdownItem}>
                            <svg aria-label="Профиль" className="_ab6-" color="#262626" fill="#262626" height="16"
                                 role="img" viewBox="0 0 24 24" width="16">
                                <circle cx="12.004" cy="12.004" fill="none" r="10.5" stroke="currentColor"
                                        stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></circle>
                                <path
                                    d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
                                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                                    stroke-width="2"></path>
                                <circle cx="12.006" cy="9.718" fill="none" r="4.109" stroke="currentColor"
                                        stroke-linecap="round" stroke-miterlimit="10" stroke-width="2"></circle>
                            </svg>
                            <span>{t('header.dropdown.profile')}</span>
                        </a>
                    </Link>
                    <Link href="/account/edit">
                        <a className={styles.dropdownItem}>
                            <svg aria-label="Настройки" className="_ab6-" color="#262626" fill="#262626" height="16"
                                 role="img" viewBox="0 0 24 24" width="16">
                                <circle cx="12" cy="12" fill="none" r="8.635" stroke="currentColor" stroke-linecap="round"
                                        stroke-linejoin="round" stroke-width="2"></circle>
                                <path
                                    d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                                    fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
                            </svg>
                            <span>{t('header.dropdown.settings')}</span>
                        </a>
                    </Link>
                    <button className={styles.dropdownItem} onClick={() => setConfirmCloseModal(true)}>{t('header.dropdown.logout')}</button>
                </div>
            )}
        </div>
            <Modal isOpen={showConfirmCloseModal} onClose={() => setConfirmCloseModal(false)}>
                <ConfirmModal
                    title={t('header.confirm.title')}
                    text={t('header.confirm.text')}
                    btnConfirm={t('header.confirm.logout')}
                    btnCancel={t('header.confirm.cancel')}
                    confirmEvent={() => {
                        logoutHandler()
                        setConfirmCloseModal(false)
                    }}
                    cancelEvent={() => setConfirmCloseModal(false)}
                />
            </Modal>
        </>
    );
};

export default ProfileDropdown;