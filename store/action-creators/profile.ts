import {Dispatch} from "redux";
import {firestore} from "../../config/firebaseSetup";
import {iProfileData, ProfileAction, profileActions} from "../types/profile";
import {auth} from "../../config/firebaseSetup";
export const fetchProfile = (uid: string) => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        try {
            const response = await firestore.collection('users').doc(uid).get().then(snapshot => snapshot.data());
            const data = response
            dispatch({type: profileActions.FETCH_PROFILE_SUCCESS, payload: data})
        }
        catch (e){
            dispatch({type: profileActions.FETCH_PROFILE_ERROR, payload : "Auth error!"})
        }
    }
}

export const updateProfile = (profileData: iProfileData) => {
    return async (dispatch: Dispatch<ProfileAction>) => {
        try {
            const response =  firestore.collection('users').doc(profileData.uid);
            await  response.update({...profileData})
            await auth.currentUser.updateEmail(profileData.email)
            dispatch({type: profileActions.EDIT_PROFILE, payload: profileData})
        }
        catch (e){
            dispatch({type: profileActions.EDIT_PROFILE_ERROR, payload : "Edit profile error!"})
        }
    }
}