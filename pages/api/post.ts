import {firestore, storage} from "../../config/firebaseSetup";
import {getDownloadURL, uploadBytesResumable} from "@firebase/storage";
import {iAddPost, iUploadFilesToPost} from "../../components/organism/AddPostForm/types";

export interface iPost {
    uid: string,
    imagesUrls: string[],
    description?: string,
    place?: string,
    likes: string[],
    comments: string[],
    isOffLikes: boolean,
    isOffComments: boolean,
    createdAt: number
}

export const addPost = async ({uid, description,place, isOffLikes,isOffComments, imagesUrls}: iAddPost) => {
    try {
        const post: iPost = {
            uid: uid,
            imagesUrls: imagesUrls,
            description: description,
            place: place,
            isOffLikes: isOffLikes,
            likes: [],
            comments: [],
            isOffComments: isOffComments,
            createdAt: new Date().getTime()
        }
        const response = firestore.collection('posts')
            await response.add(post)
    }
    catch (e) {
        console.error(e)
    }
}

export const  uploadFiles =  async ({uid, description,place, isOffLikes, isOffComments, files}: iUploadFilesToPost) => {
    try {
        let imagesUrls: string[] = [];
        let step = Array.from(files).length
        for(let i=0; i < Array.from(files).length; i++) {
            const storageRef = await storage.ref(`/images/posts/${uid}/${files[i].name}`);
            const uploadTask = uploadBytesResumable(storageRef, files[i]).then(()=>{
                getDownloadURL(storageRef).then(url => {
                    imagesUrls.push(url)
                    step = step - 1;
                    if(step === 0) {
                        addPost({uid, description,place, isOffLikes,isOffComments, imagesUrls})
                    }
                })
            })
        }

    } catch (e){
        console.log(e)
    }
}
