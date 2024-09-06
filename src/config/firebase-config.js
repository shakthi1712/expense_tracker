// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCPh47aR2umR4W325Xx57z8XH7XP0b2wR8",
  authDomain: "expense-tracker-d41ea.firebaseapp.com",
  projectId: "expense-tracker-d41ea",
  storageBucket: "expense-tracker-d41ea.appspot.com",
  messagingSenderId: "652182204827",
  appId: "1:652182204827:web:eb559095bd3adeda98313e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);