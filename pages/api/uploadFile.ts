import {firestore} from "../../config/firebaseSetup";
import {storage} from "../../config/firebaseSetup";
import {getDownloadURL, uploadBytesResumable} from "@firebase/storage";

const updateUserAvatar = async (url: string, uid: string) => {

    try {
        const response =  firestore.collection('users').doc(uid);
        await  response.update({photoUrl: url})
    }
    catch (e){
        console.log(e)
    }
}
export const  uploadFile = (file: File, uid: string) => {
    try {
        const storageRef = storage.ref(`/images/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file).then(()=>{
            getDownloadURL(storageRef).then(url => updateUserAvatar(url, uid))
        })

    } catch (e){
        console.log(e)
    }
}