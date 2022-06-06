import {ProfileAction, profileActions, profileState} from "../types/profile";

const initialState: profileState = {
    profile: null,
    error: null,
    isLoading: true
}

export const profileReducer = (state = initialState, action: ProfileAction) => {
    switch (action.type){
        case profileActions.GET_PROFILE:
            return {profile: action.payload, error: null, isLoading: false}
        case profileActions.FETCH_PROFILE_SUCCESS:
            return {profile: action.payload, error: null, isLoading: false}
        case profileActions.FETCH_PROFILE_ERROR:
            return {profile: null, error: action.payload, isLoading: false}
        case profileActions.EDIT_PROFILE:
            return {profile: {...action.payload, ...state.profile}, error: null, isLoading: false}
        case profileActions.EDIT_PROFILE_ERROR:
            return {profile: null, error: action.payload, isLoading: false}
        default:
            return state
    }
}