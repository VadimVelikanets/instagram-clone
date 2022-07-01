import React, {useState, useRef} from 'react';
import styles from './AddPostTextForm.module.scss'
import {AddPostTextFormProps} from "./types";
import {useOutsideClick} from "../../../hooks";
import dynamic from "next/dynamic";
const EmojiPicker = dynamic(()=> import("../../atoms/EmojiPicker/EmojiPicker"), {ssr: false});
const AddPostTextForm = ( {description, onChange, placeholder, addEmoji} : AddPostTextFormProps) => {
    const [showPicker, setShowPicker] = useState<boolean>(false)

    const handleClickOutside = () => {
        setShowPicker(false)
    }
    const box = useRef(null)
    useOutsideClick(box, handleClickOutside)

    return (
        <>
            <div className={styles.textarea}>
                <textarea value={description}
                          placeholder={placeholder}
                          onChange={onChange}></textarea>
                <span ref={box} className={styles.btnPicker} >
                    <span onClick={() => setShowPicker(!showPicker)}>
                        <svg aria-label="Смайлик" className="_ab6-" color="#262626" fill="#262626" height="24" role="img"
                             viewBox="0 0 24 24" width="24"><path
                            d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path></svg>
                    </span>
                    {showPicker && <div className={styles.picker}><EmojiPicker onEmojiClick={addEmoji}/></div>}
                    <div className={styles.limit}>{description.length}/2200</div>
                </span>
            </div>
        </>
    );
};

export default AddPostTextForm;