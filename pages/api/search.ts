import {firestore} from "../../config/firebaseSetup";

export const searchUser = async (value: string) => {
    try {
        const searchTerm = value.toLowerCase();
        const strlength = searchTerm.length;
        const strFrontCode = searchTerm.slice(0, strlength-1);
        const strEndCode = searchTerm.slice(strlength-1, searchTerm.length);
        const endCode = strFrontCode + String.fromCharCode(strEndCode.charCodeAt(0) + 1);
        const response = await firestore.collection('users')
            .where('nickname', '>=', searchTerm)
            .where('nickname', '<', endCode)
            .limit(10).get();
        const users = await response.docs.map(doc => doc.data())
        return users
    }
    catch (e){
        console.error(e)
    }
}