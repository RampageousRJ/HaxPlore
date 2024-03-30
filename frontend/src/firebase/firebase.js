// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API,
    authDomain: "haxplore-26ac9.firebaseapp.com",
    projectId: "haxplore-26ac9",
    storageBucket: "haxplore-26ac9.appspot.com",
    messagingSenderId: "416774254028",
    appId: "1:416774254028:web:893a1213f5c64b34790169",
    measurementId: "G-7XPSLYMBG4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
