export interface postsState {
    error: null | string,
    isLoading: boolean,
    posts: null | object
}

export enum postsActions {
    GET_POSTS_BY_ID ="GET_POSTS_BY_ID",
    FETCH_POSTS_BY_ID_SUCCESS ="FETCH_POSTS_BY_ID_SUCCESS",
    FETCH_POSTS_BY_ID_ERROR ="FETCH_POSTS_BY_ID_ERROR",
    FETCH_MORE_POSTS_BY_ID ="FETCH_MORE_POSTS_BY_ID",
}

export interface getPostsbyIdAction {
    type: postsActions.GET_POSTS_BY_ID,
    payload: string
}

export interface fetchPostsbyIdSuccessAction {
    type: postsActions.FETCH_POSTS_BY_ID_SUCCESS,
    payload: object
}

export interface fetchPostsbyIdErrorAction {
    type: postsActions.FETCH_POSTS_BY_ID_ERROR,
    payload: string
}


export interface fetchMorePostsbyIdAction {
    type: postsActions.FETCH_MORE_POSTS_BY_ID,
    payload: object
}


export type PostsAction = getPostsbyIdAction | fetchPostsbyIdSuccessAction | fetchPostsbyIdErrorAction | fetchMorePostsbyIdAction