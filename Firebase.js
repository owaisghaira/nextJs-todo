// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBR2Pj0P5iUkyKe0AswSGBzF8gTy0J9Cvw",
  authDomain: "nextjs-todo-ff6d0.firebaseapp.com",
  projectId: "nextjs-todo-ff6d0",
  storageBucket: "nextjs-todo-ff6d0.appspot.com",
  messagingSenderId: "110860344334",
  appId: "1:110860344334:web:10e92769cbf6b61f56f05f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);