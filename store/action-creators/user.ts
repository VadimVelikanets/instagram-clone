import {Dispatch} from "redux";
import {auth, provider} from "../../config/firebaseSetup";
import {signInEmail, UserAction, userActions} from "../types/user";
import {firestore} from "../../config/firebaseSetup";


export const signUp =  (email:string,password:string, name: string, nickname:string) => {
    return async (dispatch: Dispatch<UserAction>) => {
        try {
            const createData = (u: any) => {
                firestore.collection("users").doc(u?.user?.uid).set({
                    uid: u?.user?.uid,
                    email: email,
                    name: name,
                    nickname: nickname,
                    photoUrl: null,
                    about: null,
                    website: null
                })
                firestore.collection("subscribers").doc(u?.user?.uid).set({
                    uid: u?.user?.uid,
                    subscribers: [],
                    subscriptions: []
                })
                firestore.collection("posts").doc(u?.user?.uid).set({
                    uid: u?.user?.uid,
                    posts: [],
                })
            }
            await auth.createUserWithEmailAndPassword(email,password)
                .then((u) => {
                    return createData(u)
                })


        } catch (e) {
            dispatch({type: userActions.FETCH_USER_ERROR, payload : e})
        }
    }
};

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
            return auth.currentUser
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
            dispatch({type: userActions.FETCH_USER_ERROR, payload : e})
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