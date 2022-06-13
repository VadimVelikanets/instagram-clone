import {PostsAction, postsActions, postsState} from "../types/posts";

const initialState: postsState = {
    error: null,
    isLoading: true,
    posts: null
}

export const postsReducer = (state = initialState, action: PostsAction) => {
    switch (action.type) {
        case postsActions.GET_POSTS_BY_ID:
            const userData = {
                isLoading: true,
                data: []
            }
            const uid = action.payload
            return {error: null, posts: {...state.posts, [uid]: userData}, isLoading: true}
        case postsActions.FETCH_POSTS_BY_ID_SUCCESS:
            const userDataSuccess = {
                isLoading: false,
                data: action.payload?.posts
            }
            const id = action.payload?.uid
            return {error: null, posts: {...state.posts, [id]: userDataSuccess}, isLoading: false}
        case postsActions.FETCH_MORE_POSTS_BY_ID:
            const ID = action.payload?.uid
            return {error: null,
                posts: {...state.posts,
                    [ID]: {data: [...state.posts[ID].data, ...action.payload?.posts],
                          isLoading: false,
                    }},
                isLoading: false}
        case postsActions.FETCH_POSTS_BY_ID_ERROR:
            return {error: action.payload, isLoading: false,  posts: null}
        default:
            return state
    }
}