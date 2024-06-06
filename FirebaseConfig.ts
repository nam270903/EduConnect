import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDHekiJ1-QaOQDcGwo6Lf_FIa9MoF-5R5Y",
  authDomain: "educonnect-test1.firebaseapp.com",
  projectId: "educonnect-test1",
  storageBucket: "educonnect-test1.appspot.com",
  messagingSenderId: "440571945558",
  appId: "1:440571945558:web:065c2a28c5aa84b451d1f7",
  measurementId: "G-HZN2FYWRM0"
};

export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DATABASE = getDatabase(FIREBASE_APP);