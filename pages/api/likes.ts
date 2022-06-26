import {firestore} from "../../config/firebaseSetup";

export const addLikeToPost = async (uid: string, postId: string) => {
    try {
        const currentLikePost = firestore.collection('likes').doc(postId)
        const currentPost = firestore.collection('posts').doc(postId)
        const likes = await currentLikePost.get().then(snapshot => snapshot.data())
        const likesCount = await currentPost.get().then(snapshot => snapshot.data())
        const changedLikes = [...likes?.likes, uid]
        await currentLikePost.update({likes: changedLikes})
        await currentPost.update({likes: likesCount.likes + 1})
    }  catch (e) {
        console.error(e)
    }
}

export const deleteLikeToPost = async (uid: string, postId: string) => {
    try {
        const currentLikePost = firestore.collection('likes').doc(postId)
        const currentPost = firestore.collection('posts').doc(postId)
        const likes = await currentLikePost.get().then(snapshot => snapshot.data()?.likes)
        const likesCount = await currentPost.get().then(snapshot => snapshot.data())
        const changedLikes = likes.filter(item => item != uid)
        await currentLikePost.update({likes: changedLikes})
        await currentPost.update({likes: likesCount.likes - 1})
    }  catch (e) {
        console.error(e)
    }
}

export const checkYourLike = async (uid: string, postId: string) => {
    try {
        const likes = await firestore.collection('likes').doc(postId).get().then(snapshot => snapshot.data()?.likes)
        const check = !!likes.find(item => item === uid)
        return check
    }  catch (e) {
        console.error(e)
    }
}

export const getCurrentLikes =  async (postID: string) => {
    try {
        const likes = await firestore.collection('likes').doc(postID).get().then(snapshot => snapshot.data()?.likes);
        const likesData = []
        for (let i = 0; i < likes.length; i++) {
            const likesItem= await  firestore.collection('users').doc(likes[i]).get().then(snapshot => snapshot.data())
            likesData.push(likesItem)
        }
        return likesData
    }
    catch (e){
        console.error(e)
    }
}