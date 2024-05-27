// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjVgnY8R3H0CifMMQo1a2-bP0aCvR3qYA",
  authDomain: "educonnect-vtn.firebaseapp.com",
  projectId: "educonnect-vtn",
  storageBucket: "educonnect-vtn.appspot.com",
  messagingSenderId: "79887225288",
  appId: "1:79887225288:web:6b7ec7f74f981630e770fd",
  measurementId: "G-2ZD8H0HXJK"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);