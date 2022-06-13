import {Dispatch} from "redux";
import {PostsAction, postsActions} from "../types/posts";
import {firestore} from "../../config/firebaseSetup";

export const getPostsById = (uid: string) => {
    return async (dispatch: Dispatch<PostsAction>) => {
        try {
            dispatch({type: postsActions.GET_POSTS_BY_ID, payload: uid})
            const response = firestore.collection('posts').orderBy("createdAt", "desc").where('uid', '==', uid ).limit(3)
            const data = await response.get()
            const posts: any[] = []
            data.docs.forEach(item=>{
                posts.push({...item.data(), id: item.id})
            })
            dispatch({type: postsActions.FETCH_POSTS_BY_ID_SUCCESS, payload: {uid, posts}})
        } catch (e) {
            console.log(e)
            dispatch({type: postsActions.FETCH_POSTS_BY_ID_ERROR, payload: "Fetch user error"})
        }
    }
}

export const getMorePostsById = (uid: string, key: number) => {
    return async (dispatch: Dispatch<PostsAction>) => {
        try {
            const response =   firestore.collection('posts')
                .where('uid', '==', uid )
                .orderBy("createdAt", "desc")
                .limit(3)
                .startAfter(key)
            const data = await response.get()
            const posts: any[] = []
            data.docs.forEach(item=>{
                posts.push({...item.data(), id: item.id})
            })
            if(posts.length > 0) {
                dispatch({type: postsActions.FETCH_MORE_POSTS_BY_ID, payload: {uid, posts}})
            }
        } catch (e) {
            console.log(e)
            dispatch({type: postsActions.FETCH_POSTS_BY_ID_ERROR, payload: e})
        }
    }
}