// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1fXueM71u_5kP176T-9f4jNXBt0rdplc",
  authDomain: "studygroup-72234.firebaseapp.com",
  projectId: "studygroup-72234",
  storageBucket: "studygroup-72234.firebasestorage.app",
  messagingSenderId: "944574673256",
  appId: "1:944574673256:web:87d24568d425c5fdc3e6dd",
  measurementId: "G-WM4DCTKC4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);