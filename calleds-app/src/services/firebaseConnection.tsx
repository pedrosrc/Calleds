import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import {getAuth} from "firebase/auth";
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyD8_WTqBU4KWauBj5aTEuLpE1tTZD5s-Vk",
  authDomain: "calleds-218c4.firebaseapp.com",
  projectId: "calleds-218c4",
  storageBucket: "calleds-218c4.appspot.com",
  messagingSenderId: "402223836672",
  appId: "1:402223836672:web:d0df26c7ec73c81d2fb2e5",
  measurementId: "G-G8WJGSPX8G"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };