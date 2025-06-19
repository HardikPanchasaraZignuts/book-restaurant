// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCOOF52_WhsTP_84RjUWFsUwDAR3idx6JY",
  authDomain: "book-restaurant-dc2ee.firebaseapp.com",
  projectId: "book-restaurant-dc2ee",
  storageBucket: "book-restaurant-dc2ee.firebasestorage.app",
  messagingSenderId: "772253585187",
  appId: "1:772253585187:web:5603ddf1a2743f60684696",
  measurementId: "G-K0CZLKTMYP",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)

