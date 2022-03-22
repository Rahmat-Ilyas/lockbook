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
  apiKey: "AIzaSyCv1zd9IEb2N-rmmRp81I90s0AwdSTe-fU",
  authDomain: "logbook-c0025.firebaseapp.com",
  projectId: "logbook-c0025",
  storageBucket: "logbook-c0025.appspot.com",
  messagingSenderId: "486019988923",
  appId: "1:486019988923:web:b7a7625e4b7e25ed2d989e",
  measurementId: "G-MBT009PJ35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth();
export const db = getFirestore();