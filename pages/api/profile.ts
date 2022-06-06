import {firestore} from "../../config/firebaseSetup";

export const getProfileData = async (uid: string) => {
    try {
        const response = await firestore.collection('users').doc(uid).get().then(snapshot => snapshot.data());
        const data = response
        return data
    }
    catch (e){
        console.error(e)
    }
}

export const getUserData = async (nickname: string) => {
    try {
        const response =  firestore.collection('users').where('nickname', '==', nickname);
        const data = await response.get();
        const user = data.docs.map(doc => doc.data())
        return user
    }
    catch (e){
        console.error(e)
    }
}
