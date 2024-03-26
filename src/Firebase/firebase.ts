// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAaxcZFmZIkRtrldY9KGrOHzh0Er7Js7kI",
  authDomain: "comp1640-7802a.firebaseapp.com",
  projectId: "comp1640-7802a",
  storageBucket: "comp1640-7802a.appspot.com",
  messagingSenderId: "406642764714",
  appId: "1:406642764714:web:5fffbc3ece3520fd3fd9d3",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
