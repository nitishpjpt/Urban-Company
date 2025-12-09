// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";


const firebaseConfig = {
  apiKey: "AIzaSyCYxEl8Mh4urKeIdWdwwMC1ZiEWfLPTMT8",
  authDomain: "batting-aabd9.firebaseapp.com",
  projectId: "batting-aabd9",
  storageBucket: "batting-aabd9.firebasestorage.app",
  messagingSenderId: "1070541766888",
  appId: "1:1070541766888:web:979b9df63be3bfe0abc95d",
  measurementId: "G-16D9RNGSFR"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
