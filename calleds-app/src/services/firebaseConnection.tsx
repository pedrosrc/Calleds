import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBrjH4w5BIOTj4dmwrg6rpMXA6G3zNLNqs",
  authDomain: "calleds.firebaseapp.com",
  projectId: "calleds",
  storageBucket: "calleds.appspot.com",
  messagingSenderId: "126157815179",
  appId: "1:126157815179:web:f6eb596826ceb4f4f7438e",
  measurementId: "G-PQYP65193P"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);

export {db, auth};