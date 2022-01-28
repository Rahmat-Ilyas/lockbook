// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC5CjSC_0-MQEE8GZ2GKFrWEUCLdADvnHw",
  authDomain: "lockbook-fd385.firebaseapp.com",
  projectId: "lockbook-fd385",
  storageBucket: "lockbook-fd385.appspot.com",
  messagingSenderId: "496672661355",
  appId: "1:496672661355:web:7bcd23bccbf16ea3c5362e",
  measurementId: "G-EQHZ83EHH1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();