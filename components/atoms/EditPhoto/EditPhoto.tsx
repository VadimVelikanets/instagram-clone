import React, {useState, FC} from 'react';
import Image from 'next/image';
import {uploadFile} from "../../../pages/api/uploadFile";
import {iProfileData} from "../../../store/types/profile";
import styles from "./EditPhoto.module.scss";

const EditPhoto: FC<iProfileData> = ({profileData}) => {
    const [image, setImage] = useState(profileData?.photoUrl);

    const uploadAvatarHandler = (e: React.ChangeEvent<HTMLInputElement> ) => {
        uploadFile(e?.target?.files[0], profileData?.uid)
        setImage(URL.createObjectURL(e?.target?.files[0]))
    }

    return (
        <div className={styles.avatarWrapper}>
            <aside className={styles.aside}>
                <Image src={image ? image: "/images/empty-avatar.png"}
                       loader={() => (profileData && profileData?.photoUrl != null) ? profileData?.photoUrl: "/images/empty-avatar.png"}
                       height="38" width="38" className={styles.avatar}/>
            </aside>
            <div className={styles.avatarInfo}>
                <span className={styles.username}>{profileData && profileData.nickname}</span>
                <div className={styles.inputWrapper}>
                    <span>Изменить фото профиля</span>
                    <input className={styles.input} type="file" onChange={e => uploadAvatarHandler(e)} accept="image/jpeg,image/png"/>
                </div>

            </div>

        </div>
    );
};

export default EditPhoto;