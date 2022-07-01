import React, {useEffect, useState, useRef} from 'react';
import styles from './CommentForm.module.scss'
import EmojiPicker from "../../atoms/EmojiPicker/EmojiPicker";
import {addComment} from '../../../pages/api/comments'
import {CommentFormProps} from "./types";
import {useTranslation} from "react-i18next";
import {useOutsideClick} from "../../../hooks";
const CommentForm = ( {uid, postId, setCommentAdd, repliedUser} : CommentFormProps) => {
    const {t} = useTranslation();

    const [value, setValue] = useState<string>('')
    const [disabled, setDisabled] = useState<boolean>(true)
    const [showPicker, setShowPicker] = useState<boolean>(false)

    const addEmoji = (event, emojiObject) => {
        setValue(value+emojiObject.emoji )
    };

    const handleClickOutside = () => {
        setShowPicker(false)
    }
    const box = useRef(null)
    useOutsideClick(box, handleClickOutside)

    useEffect(() => {
        if(value !== '') {
            setDisabled(false)
        } else {
            setDisabled(true)
        }
    }, [disabled, value])

    useEffect(() => {
        if(repliedUser != '') {
        setValue('@'+repliedUser + ' ')
        }
    }, [repliedUser])

    const addCommentHandler = async () => {
        setDisabled(true)
        await addComment({
            uid: uid,
            postId: postId,
            text: value,
            likes: []
        })
        setDisabled(false)
        setValue('')
        setCommentAdd(true)
    }


    return (
        <div className={styles.form}>
            <span ref={box} className={styles.btnPicker} >
                <span onClick={() => setShowPicker(!showPicker)}>
                    <svg aria-label="Смайлик" className="_ab6-" color="#262626" fill="#262626" height="24" role="img"
                     viewBox="0 0 24 24" width="24"><path
                    d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
                </span>
                {showPicker && <div className={styles.picker}><EmojiPicker onEmojiClick={addEmoji}/></div>}
            </span>

            <textarea value={value}
                      placeholder={t('postPage.comments.addComment')}
                      onChange={e => setValue(e.target.value)}></textarea>
            <button disabled={disabled}
                    className={styles.submit}
                    onClick={addCommentHandler}
            >{t('postPage.comments.publish')}</button>
        </div>
    );
};

export default CommentForm;