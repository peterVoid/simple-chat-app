// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCMtPPJZxaOqKnkD73DAdZ0OoNSba5DxhM",
  authDomain: "simple-chat-app-a9c58.firebaseapp.com",
  projectId: "simple-chat-app-a9c58",
  storageBucket: "simple-chat-app-a9c58.appspot.com",
  messagingSenderId: "113993821192",
  appId: "1:113993821192:web:83c60d128e08e4ba63b5bd",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
