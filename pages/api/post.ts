import {firestore, storage} from "../../config/firebaseSetup";
import {getDownloadURL, uploadBytesResumable} from "@firebase/storage";
import {iAddPost, iUploadFilesToPost} from "../../components/organism/AddPostForm/types";

export interface iPost {
    uid: string,
    imagesUrls: string[],
    description?: string,
    place?: string,
    likes: number,
    comments: number,
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
            likes: 0,
            comments: 0,
            isOffComments: isOffComments,
            createdAt: new Date().getTime()
        }
        const response = await firestore.collection('posts')

        const createCollection = (postId) => {
            firestore.collection('likes').doc(postId).set({
                likes: []
            })

            firestore.collection('comments').doc(postId).set({
            })
        }
        await response.add(post).then(doc => createCollection(doc.id))

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

export const getAllPosts = async () => {
    try {
        const response = await firestore.collection('posts')
            .orderBy("createdAt", "desc").limit(3)
        const data = await response.get()
        const posts: any[] = []
        data.docs.forEach(item=>{
            posts.push({...item.data(), id: item.id})
        })
        return posts
    }
    catch (e){
        console.error(e)
    }
}

export const getAllPostsMore = async (key: number) => {
    try {
        const response = await firestore.collection('posts')
            .orderBy("createdAt", "desc")
            .limit(3).startAfter(key)
        const data = await response.get()
        const posts: any[] = []
        data.docs.forEach(item=>{
            posts.push({...item.data(), id: item.id})
        })
        return posts
    }
    catch (e){
        console.error(e)
    }
}

export const getPostById = async (id: string) => {
    try {
        const response = await firestore.collection('posts').doc(id).get().then(snapshot => snapshot.data());
        const data = response
        return data
    }
    catch (e){
        console.error(e)
    }
}

export const getPostsSize = async (uid: string) => {
    try {
        const response = await firestore.collection('posts')
            .where('uid', '==', uid ).get()
            .then((snapshot) => snapshot.docs.length);
        const data = response
        return data
    }
    catch (e){
        console.error(e)
    }
}

export const getAllPostsSize = async () => {
    try {
        const response = await firestore.collection('posts').get()
            .then((snapshot) => snapshot.docs.length);
        const data = response
        return data
    }
    catch (e){
        console.error(e)
    }
}