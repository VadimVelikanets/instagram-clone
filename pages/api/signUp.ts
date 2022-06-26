import {auth, firestore} from "../../config/firebaseSetup";
import {Dispatch} from "redux";
import {UserAction, userActions} from "../../store/types/user";

export const signUp = async (email:string,password:string, name: string, nickname:string) => {
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

    } catch (err) {
        console.error(err);
    }
};

export const checkUserExist = async (nickname: string, email: string) => {
    try {
        const checkNickname =  await firestore.collection('users').where('nickname', '==', nickname).get();
        const checkEmail = await firestore.collection('users').where('email', '==', email).get();
        const [userByNickname] = checkNickname.docs.map(doc => doc.data())
        const [userByEmail] = checkEmail.docs.map(doc => doc.data())
        return (!!userByNickname || !!userByEmail)
    } catch (e) {
        console.log(e);
    }

}