import {userActions, UserState} from "../types/user";

const initialState: UserState = {
    user: null,
    error: null,
    isLoading: true
}

export const userReducer = (state=initialState, action : any): UserState | undefined => {
    switch (action.type) {
        case userActions.GET_USER:
            return {user: action.payload, error: null, isLoading: false}
        case userActions.FETCH_USER_SUCCESS:
            return { user: action.payload, error: null, isLoading: false}
        case userActions.FETCH_USER_ERROR:
            return { user: null, error: action.payload}
        case userActions.LOGOUT_USER:
            return { user: null, error: null}
        default:
            return state
    }
}