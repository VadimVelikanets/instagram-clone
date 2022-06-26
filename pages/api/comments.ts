import {firestore} from "../../config/firebaseSetup";

export interface iComment {
    uid: string,
    postId: string
    text: string,
    createdAt?: number,
    likes: any[],
}

export const addComment = async ({uid, postId, text, likes} : iComment) => {
    try {
        const comment: iComment = {
            uid, postId, text, createdAt: new Date().getTime(), likes
        }
        await firestore.collection('comments').add(comment)
        const currentPost = await firestore.collection('posts').doc(postId)
        const comments = await firestore.collection('comments').doc(postId).get().then(snapshot => snapshot.data())
        const commentsCount = await currentPost.get().then(snapshot => snapshot.data())
        await currentPost.update({comments: commentsCount?.comments + 1})
    }
    catch (e){
        console.error(e)
    }
}

export const getCommentsByPost = async (postId: string) => {
    try {
        const response = await firestore.collection('comments').where('postId', '==', postId ).orderBy("createdAt", "desc").limit(5).get()
        const posts = await response.docs.map(doc => doc.data())

        return posts
    }
    catch (e) {
        console.log(e)
    }
}

export const getMoreCommentsByPost = async (postId: string, key: number) => {
    try {
        const response = await firestore.collection('comments')
            .where('postId', '==', postId )
            .orderBy("createdAt", "desc")
            .limit(5).startAfter(key).get()
        const posts = await response.docs.map(doc => doc.data())
        return posts
    }
    catch (e) {
        console.log(e)
    }
}

export const getCommentsSize = async (postId: string) => {
    try {
        const response = await firestore.collection('comments')
            .where('postId', '==', postId ).get()
            .then((snapshot) => snapshot.docs.length);
        const data = response
        return data
    }
    catch (e){
        console.error(e)
    }
}