import React, {useEffect, useState} from 'react';
import styles from './MobileMenu.module.scss';
import Link from "next/link";
import {getProfileData} from "../../../pages/api/profile";
import {iMenuItem, iMobileMenu} from "./types";
import Image from "next/image";
import Modal from "../../organism/Modal/Modal";
import AddPostForm from "../../organism/AddPostForm/AddPostForm";
import ConfirmModal from "../ConfirmModal/ConfirmModal";
import {useTranslation} from "react-i18next";

const MobileMenu = ({uid} : iMobileMenu) => {
    const {t} = useTranslation()
    const [isAddModalOpen, setAddModalOpen] = useState(false)
    const [showConfirmCloseModal, setConfirmCloseModal] = useState(false)
    const [isPostAdded, setPostAdded] = useState(false)
    const [menu, setMenu] = useState<iMenuItem[]>([
        {
            name: 'main',
            url: '/',
            icon: <svg aria-label="Главная" className="_ab6-" color="#262626" fill="#262626" height="24" role="img"
                       viewBox="0 0 24 24" width="24">
                <path
                    d="M9.005 16.545a2.997 2.997 0 012.997-2.997h0A2.997 2.997 0 0115 16.545V22h7V11.543L12 2 2 11.543V22h7.005z"
                    fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="2"></path>
            </svg>
        },
        {
            name: 'search',
            url: '',
            icon: <svg aria-label="Поиск и интересное" className="_ab6-" color="#262626" fill="#262626" height="24"
                       role="img" viewBox="0 0 48 48" width="24">
                <path
                    d="M47.6 44L35.8 32.2C38.4 28.9 40 24.6 40 20 40 9 31 0 20 0S0 9 0 20s9 20 20 20c4.6 0 8.9-1.6 12.2-4.2L44 47.6c.6.6 1.5.6 2.1 0l1.4-1.4c.6-.6.6-1.6.1-2.2zM20 35c-8.3 0-15-6.7-15-15S11.7 5 20 5s15 6.7 15 15-6.7 15-15 15z"></path>
            </svg>
        },
        {
            name: 'addPost',
            url: '',
            icon: <svg aria-label="Новая публикация" className="_ab6-" color="#262626" fill="#262626" height="24"
                       role="img" viewBox="0 0 24 24" width="24">
                <path
                    d="M2 12v3.45c0 2.849.698 4.005 1.606 4.944.94.909 2.098 1.608 4.946 1.608h6.896c2.848 0 4.006-.7 4.946-1.608C21.302 19.455 22 18.3 22 15.45V8.552c0-2.849-.698-4.006-1.606-4.945C19.454 2.7 18.296 2 15.448 2H8.552c-2.848 0-4.006.699-4.946 1.607C2.698 4.547 2 5.703 2 8.552z"
                    fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                    stroke-width="2"></path>
                <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      x1="6.545" x2="17.455" y1="12.001" y2="12.001"></line>
                <line fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      x1="12.003" x2="12.003" y1="6.545" y2="17.455"></line>
            </svg>
        },

    ])

    useEffect(() => {
        if(uid) {
            getProfileData(uid).then(data => {
                const profileItem: iMenuItem = {
                    name: 'profile',
                    url: data?.nickname,
                    icon: <Image
                    src={data?.photoUrl ? data?.photoUrl : "/images/empty-avatar.png"}
                    loader={() => (data && data?.photoUrl != null) ? data?.photoUrl : "/images/empty-avatar.png"}
                    width={24}
                    height={24}
                    className="rounded-full"
                />
            }
                setMenu(prevState => [...prevState, profileItem])
            })
        }

    }, [])


    const addPostHandler = () => {
        setAddModalOpen(true)
    }

    const cancelPost = () => {
        setConfirmCloseModal(true)
    }

    const checkPostAdded = (value: boolean) => {
        setPostAdded(value)
    }

    return (
        <>
            <div className={styles.menu}>
                <ul>
                    {menu.map(item => (
                        item.name === 'addPost' ? (
                            <li key={item.name}>
                                    <a onClick={addPostHandler}>
                                        {item.icon}
                                    </a>
                            </li>) : (
                            <li key={item.name}>
                                <Link href={item.url}>
                                    <a>
                                        {item.icon}
                                    </a>
                                </Link>
                            </li>
                        )
                    ))}
                </ul>
            </div>
            <Modal isOpen={isAddModalOpen}
                   onClose={() => isPostAdded ? setAddModalOpen(false) :
                       (setConfirmCloseModal(true), setPostAdded(false))}>
                <AddPostForm cancelPost={cancelPost} checkPostAdded={checkPostAdded}/>
            </Modal>
            <Modal isOpen={showConfirmCloseModal} onClose={() => setConfirmCloseModal(false)}>
                <ConfirmModal
                    title={t('createPost.confirmModal.title')}
                    text={t('createPost.confirmModal.text')}
                    btnConfirm={t('createPost.confirmModal.discard')}
                    btnCancel={t('createPost.confirmModal.cancel')}
                    confirmEvent={() => {
                        setAddModalOpen(false)
                        setConfirmCloseModal(false)
                    }}
                    cancelEvent={() => setConfirmCloseModal(false)}
                />
            </Modal>
        </>
    );
};

export default MobileMenu;