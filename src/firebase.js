// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; 
import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {

  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,

  authDomain: "finance-app-a430d.firebaseapp.com",

  projectId: "finance-app-a430d",

  storageBucket: "finance-app-a430d.firebasestorage.app",

  messagingSenderId: "861362042505",

  appId: "1:861362042505:web:777de3fc501d435cc4f858",

  measurementId: "G-EP0FLT3GGC"

};


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const analytics = getAnalytics(app);
const auth = getAuth(app); // Export auth
const firestore = getFirestore(app); // Export firestore

export { auth, firestore };