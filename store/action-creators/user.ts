import {Dispatch} from "redux";
import {auth, provider} from "../../config/firebaseSetup";
import {signInEmail, UserAction, userActions} from "../types/user";
import {firestore} from "../../config/firebaseSetup";

export const getUser = (user: object ) => {
    let payload = null;
    if(Object.keys(user).length == 0) {
        payload = null
    } else {
        payload = user
    }
    return {
        type: userActions.GET_USER,
        payload: payload
    }
}

export const fetchUserFacebook = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await auth.signInWithPopup(provider).then(res => console.log(res))
            dispatch({type: userActions.FETCH_USER_SUCCESS, payload: auth.currentUser})
            localStorage.setItem('userData', JSON.stringify(auth.currentUser))
        }
        catch (e){
            dispatch({type: userActions.FETCH_USER_ERROR, payload : "Auth error!"})
        }
    }
}

export const fetchUserEmail = ({email, password}: signInEmail) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await auth.signInWithEmailAndPassword(email, password).then(res => console.log(res))
            dispatch({type: userActions.FETCH_USER_SUCCESS, payload: auth.currentUser})
            localStorage.setItem('userData', JSON.stringify(auth.currentUser))
        }
        catch (e){
            dispatch({type: userActions.FETCH_USER_ERROR, payload : "Auth error!"})
        }
    }
}

export const logoutUser = () => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            await  auth.signOut();
            dispatch(({type: userActions.LOGOUT_USER}))
            localStorage.removeItem('userData')
        }
        catch (e){
            dispatch({type: userActions.FETCH_USER_ERROR, payload : "Auth error!"})
        }
    }
}