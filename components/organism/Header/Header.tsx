import React, {useEffect, FC, useState} from 'react';
import Image from 'next/image';
import Link from "next/link";
import styles from "./Header.module.scss";
import {useDispatch} from "react-redux";
import {logoutUser} from "../../../store/action-creators/user";
import {useRouter} from "next/router";
import {getProfileData} from "../../../pages/api/profile";
import Modal from "../Modal/Modal";
import AddPostForm from "../AddPostForm/AddPostForm";
import {iHeader} from "./types";
import ConfirmModal from "../../molecules/ConfirmModal/ConfirmModal";

const Header: FC<iHeader> = ({uid}) => {

    const router = useRouter();
    const dispatch = useDispatch();
    const [nickname, setNickname] = useState(null)
    const [isAddModalOpen, setAddModalOpen] = useState(false)
    const [showConfirmCloseModal, setConfirmCloseModal] = useState(false)
    const [isPostAdded, setPostAdded] = useState(false)
    const logoutHandler = () => {
        dispatch(logoutUser());
        router.push('/account/login')
    }

    useEffect(() => {
        if(uid) {
            getProfileData(uid).then(data => setNickname(data?.nickname))
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
            <div className={styles.header}>
                <div className="container">
                    <div className={`${styles.headerWrapper} flex justify-between`}>
                        <Link href="/">
                            <Image src="/images/logo.png" width="103" height="29"/>
                        </Link>
                        <div className={styles.headerRight}>
                            <button onClick={addPostHandler}>
                                <Image src="/images/icons/add.svg" width={20} height={20}/>
                            </button>
                            {nickname && <Link href={`/${nickname}`}> Profile </Link>}
                            <button onClick={logoutHandler}>Logout</button>
                        </div>
                    </div>
                </div>
            </div>
            <Modal isOpen={isAddModalOpen}
                   onClose={() => isPostAdded ? setAddModalOpen(false) :
                       (setConfirmCloseModal(true), setPostAdded(false))}>
                <AddPostForm cancelPost={cancelPost} checkPostAdded={checkPostAdded}/>
            </Modal>

            <Modal isOpen={showConfirmCloseModal} onClose={() => setConfirmCloseModal(false)}>
                <ConfirmModal
                    title={`Отменить публикацию?`}
                    text={`Если вы выйдете, изменения не будут сохранены.`}
                    btnConfirm={`Удалить`}
                    btnCancel={`Отмена`}
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
export default Header;