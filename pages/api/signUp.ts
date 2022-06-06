import {auth, firestore} from "../../config/firebaseSetup";
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