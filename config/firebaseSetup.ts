import firebase from 'firebase/compat/app';
import 'firebase/compat/auth'
import 'firebase/compat/storage';
import 'firebase/compat/firestore';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAHMMsoMqO3HGfI2dWBNjm0gHsKCootYbo",
    authDomain: "insta-clone-947c0.firebaseapp.com",
    projectId: "insta-clone-947c0",
    storageBucket: "insta-clone-947c0.appspot.com",
    messagingSenderId: "697781156886",
    appId: "1:697781156886:web:8f68e4ac088b9c4defc937",
    measurementId: "G-DV93N41Y5V"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const storage = firebase.storage();
export const firestore = firebase.firestore();
export const provider = new firebase.auth.FacebookAuthProvider();