import React, {useState, FC} from 'react';
import styles from './AddPostForm.module.scss';
import Image from "next/image";
import {useTranslation} from "react-i18next";
import {useAppSelector} from "../../../hooks";
import DragDropFiles from "../../atoms/DragDropFiles/DragDropFiles";
import PreviewSlider from "../../molecules/PreviewSlider/PreviewSlider";
import InputEmoji from 'react-input-emoji';
import Switch from "../../atoms/Switch/Switch";
import {iAddPostForm} from "./types";
import AddLoader from "../../atoms/AddLoader/AddLoader";
import {uploadFiles} from "../../../pages/api/post";
const AddPostForm: FC<iAddPostForm> = ({cancelPost, checkPostAdded}) => {
    const {t} = useTranslation();
    const [step, setStep] = useState(1);
    const [images, setImages] = useState(null);
    const [files, setFiles] = useState<null | object>(null);
    const [description, setDescription] = useState('');
    const [place, setPlace] = useState('');
    const [isOffLikes, setOffLikes] = useState(false)
    const [isOffComments, setOffComments] = useState(false)
    const [isAddLoading, setAddLoading] = useState(false)
    const uid = useAppSelector(state => state?.user?.user?.uid)
    const profile = useAppSelector(state => state?.profile?.profile)

    const uploadPostFilesHandler = (e:  React.ChangeEvent<HTMLInputElement>) => {
        setFiles(e?.target?.files)
        const preview = Array.from(e?.target?.files).map(item => {
            return URL.createObjectURL(item)
        })
        setImages(preview)
        setStep(step + 1)
    }

    const getDropFiles = (files: object) => {
        setFiles(files)
        const preview = Array.from(files).map(item => {
            return URL.createObjectURL(item)
        })
        setImages(preview)
        setStep(step + 1)
    }

    const addPostHandler = () => {
        setStep(step + 1)
        setAddLoading(true)
        uploadFiles({uid, description,place, isOffLikes, isOffComments, files})
        setAddLoading(false)
        checkPostAdded(true)
    }

    return (
        <div className={styles.form}>
            {(() => {
                switch (step) {
                    case 1:
                        return <><div className={styles.title}>{t('createPost.createNewPost')}</div>
                            <div className={styles.fileWrapper}>
                                <DragDropFiles getDropFiles={getDropFiles}/>
                                <div className={styles.file}>
                                    <button className="bg-blue-400 text-white py-1 px-2 rounded-sm font-semibold text-sm">{t('createPost.selectFiles')}</button>
                                    <input type="file" accept="image/jpeg,image/png" multiple onChange={e => uploadPostFilesHandler(e)}/>
                                </div>
                            </div>
                        </>
                    case 2: return <>
                        <div className={styles.titleWrapper}>
                            <button onClick={cancelPost}>
                                <svg aria-label="Назад" className="_8-yf5 " color="#262626" fill="#262626" height="24"
                                     role="img" viewBox="0 0 24 24" width="24">
                                    <line fill="none" stroke="currentColor" stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004"
                                          y2="12.004"></line>
                                    <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274"
                                              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2"></polyline>
                                </svg></button>
                            <div><b>{t('createPost.view')}</b></div>
                            <button className={styles.btnNext}
                                    onClick={() => setStep(step + 1)}
                            >{t('createPost.nextBtn')}</button>
                        </div>
                        <PreviewSlider>
                            {images && images.map((item) => (
                                <Image key={item} src={item} width="100%" height="100%" layout="responsive" objectFit="cover"/>
                            ))}
                        </PreviewSlider>
                    </>
                    case 3: return <>
                        <div className={styles.titleWrapper}>
                            <button onClick={() => setStep(step - 1 )}>
                                <svg aria-label="Назад" className="_8-yf5 " color="#262626" fill="#262626" height="24"
                                     role="img" viewBox="0 0 24 24" width="24">
                                    <line fill="none" stroke="currentColor" stroke-linecap="round"
                                          stroke-linejoin="round" stroke-width="2" x1="2.909" x2="22.001" y1="12.004"
                                          y2="12.004"></line>
                                    <polyline fill="none" points="9.276 4.726 2.001 12.004 9.276 19.274"
                                              stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"
                                              stroke-width="2"></polyline>
                                </svg></button>
                            <div><b>{t('createPost.createNewPost')}</b></div>
                            <button className={styles.btnNext}
                                    onClick={addPostHandler}
                            >{t('createPost.shareBtn')}</button>
                        </div>
                        <div className={styles.info}>
                            <PreviewSlider>
                                {images && images.map((item) => (
                                    <Image key={item} src={item} width="100%" height="100%" layout="responsive" objectFit="cover"/>
                                ))}
                            </PreviewSlider>
                            <div className={styles.content}>
                                <div className={styles.profile}>
                                    <Image src={profile ? profile?.photoUrl : "/images/empty-avatar.png"}
                                           loader={() => (profile && profile?.photoUrl != null) ? profile?.photoUrl: "/images/empty-avatar.png"}
                                           height="28" width="28" className={styles.avatar}/>
                                    <div className={styles.profileName}>{profile?.nickname}</div>
                                </div>
                                <div className={styles.textarea}>
                                    <InputEmoji
                                        value={description}
                                        onChange={setDescription}
                                        placeholder={t('createPost.caption')}
                                    />
                                    <div className={styles.limit}>{description.length}/2200</div>
                                </div>
                                <div className={styles.placeInput}>
                                    <input type="text"
                                           value={place}
                                           placeholder={t('createPost.addLocation')}
                                           onChange={e=> setPlace(e.target.value)}
                                    />
                                    <span>
                                        <svg aria-label="Добавить место" className="_ab6-" color="#8e8e8e"
                                             fill="#8e8e8e" height="16" role="img" viewBox="0 0 24 24" width="16"><path
                                            d="M12.053 8.105a1.604 1.604 0 101.604 1.604 1.604 1.604 0 00-1.604-1.604zm0-7.105a8.684 8.684 0 00-8.708 8.66c0 5.699 6.14 11.495 8.108 13.123a.939.939 0 001.2 0c1.969-1.628 8.109-7.424 8.109-13.123A8.684 8.684 0 0012.053 1zm0 19.662C9.29 18.198 5.345 13.645 5.345 9.66a6.709 6.709 0 0113.417 0c0 3.985-3.944 8.538-6.709 11.002z"></path></svg>
                                    </span>
                                </div>
                                <div className={styles.setting}>
                                    <div className={styles.settingTitle}>
                                        {t('createPost.hideLikeTitle')}
                                    </div>
                                    <Switch checked={isOffLikes} onChange={e => setOffLikes(!isOffLikes)}/>
                                </div>
                                <div className={styles.settingText}>
                                    {t('createPost.hideLikeText')}
                                </div>
                                <div className={styles.setting}>
                                    <div className={styles.settingTitle}>
                                        {t('createPost.TurnOffComment')}
                                    </div>
                                    <Switch checked={isOffComments} onChange={e => setOffComments(!isOffComments)}/>
                                </div>
                                <div className={styles.settingText}>
                                    {t('createPost.TurnOffCommentText')}
                                </div>
                            </div>
                        </div>
                    </>
                    case 4: return <>
                        <div className={styles.finish}>
                            {isAddLoading ? (
                                <div className={styles.loader}>
                                    <AddLoader/>
                                </div>
                            ) : (<>
                                <div className={styles.title}>{t('createPost.sharedPost')}</div>
                                <div className={styles.finishInner}>
                                    <Image src={'/images/ok.gif'} width={96} height={96}/>
                                    <div className={styles.finishTitle}>{t('createPost.posted')}</div>
                                </div>
                                </>)}
                        </div>
                    </>
                    default:
                        return <><div className={styles.title}>{t('createPost.createNewPost')}</div>
                            <input type="file" accept="image/jpeg,image/png" multiple onChange={e => uploadPostFilesHandler(e)}/>
                        </>
                }
            })()}
        </div>
    );
};

export default AddPostForm;