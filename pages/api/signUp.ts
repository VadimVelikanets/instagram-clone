import {auth, firestore} from "../../config/firebaseSetup";
import {Dispatch} from "redux";
import {UserAction, userActions} from "../../store/types/user";
import {waitForPendingWrites} from "@firebase/firestore/dist/packages/firestore/dist/index.esm2017";

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
        }
        await auth.createUserWithEmailAndPassword(email,password)
            .then((u) => {
                return createData(u)
            })

    } catch (err) {
        console.error(err);
    }
};

export const signUpFacebook = async (user: object, name: string, nickname:string) => {
    try {
        const createData = (u: any) => {
            firestore.collection("users").doc(user?.uid).set({
                uid: user?.uid,
                email: user?.email,
                name: name,
                nickname: nickname,
                photoUrl: null,
                about: null,
                website: null
            })
            firestore.collection("subscribers").doc(user?.uid).set({
                uid: user?.uid,
                subscribers: [],
                subscriptions: []
            })
        }
        return await createData(user)

    } catch (err) {
        console.error(err);
    }
};


export const checkUserExist = async (nickname: string , email: string) => {
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

export const checkFBUserExist = async (email: string ) => {
    try {
        const checkEmail = await firestore.collection('users').where('email', '==', email).get();
        const [userByEmail] = checkEmail.docs.map(doc => doc.data())
        return !!userByEmail
    } catch (e) {
        console.log(e);
    }
}

