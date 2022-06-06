export interface iProfileData {
    uid: string,
    email: string,
    name:string,
    nickname: string
    photoUrl: string | null,
    about: string | null,
    website: string | null,
    posts: [],
    subscribers: []
    subscriptions: []
}

export interface profileState {
    profile: null | iProfileData,
    error: string | null,
    isLoading: boolean
}

export enum profileActions {
    GET_PROFILE ="GET_PROFILE",
    FETCH_PROFILE_ERROR ="FETCH_PROFILE_ERROR",
    FETCH_PROFILE_SUCCESS ="FETCH_PROFILE_SUCCESS",
    EDIT_PROFILE = "EDIT_PROFILE",
    EDIT_PROFILE_ERROR = "EDIT_PROFILE_ERROR",
}

export interface getProfileAction {
    type: profileActions.GET_PROFILE,
    payload: any
}

export interface fetchProfileErrorAction {
    type: profileActions.FETCH_PROFILE_SUCCESS,
    payload: string
}

export interface fetchProfileSuccessAction {
    type: profileActions.FETCH_PROFILE_ERROR,
    payload: string
}

export interface editProfileAction {
    type: profileActions.EDIT_PROFILE,
    payload: iProfileData
}

export interface editProfileErrorAction {
    type: profileActions.EDIT_PROFILE_ERROR,
    payload: string
}

export type ProfileAction = getProfileAction | fetchProfileErrorAction | fetchProfileSuccessAction | editProfileAction | editProfileErrorAction
