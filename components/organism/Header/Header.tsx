import React, {FC, useState} from 'react';
import Image from 'next/image';
import Link from "next/link";
import {useTranslation} from "react-i18next";
import styles from "./Header.module.scss";
import {useDispatch} from "react-redux";
import {useRouter} from "next/router";
import Modal from "../Modal/Modal";
import AddPostForm from "../AddPostForm/AddPostForm";
import {iHeader} from "./types";
import ConfirmModal from "../../molecules/ConfirmModal/ConfirmModal";
import ProfileDropdown from "../../molecules/ProfileDropdown/ProfileDropdown";
import SearchInput from "../../atoms/SearchInput/SearchInput";
import useBreakpoint from "../../../hooks/useBreakpoint";

const Header: FC<iHeader> = ({uid}) => {
    const breakpoint = useBreakpoint();
    const {t} = useTranslation()
    const [isAddModalOpen, setAddModalOpen] = useState(false)
    const [showConfirmCloseModal, setConfirmCloseModal] = useState(false)
    const [isPostAdded, setPostAdded] = useState(false)

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
            {breakpoint.width > 960 && (
                <div className={styles.header}>
                    <div className="container">
                        <div className={`${styles.headerWrapper} flex justify-between`}>
                            <Link href="/">
                                <Image src="/images/logo.png" width="103" height="29"/>
                            </Link>
                            <SearchInput/>
                            <div className={styles.headerRight}>
                                <button onClick={addPostHandler}>
                                    <Image src="/images/icons/add.svg" width={24} height={24}/>
                                </button>
                                <ProfileDropdown uid={uid}/>
                            </div>
                        </div>
                    </div>
                </div>)
            }
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
export default Header;