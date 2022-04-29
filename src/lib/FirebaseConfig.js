import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import {
  getFirestore,
  collection,
  addDoc,
  doc,
  setDoc,
} from "firebase/firestore";

// eslint-disable-next-line import/prefer-default-export
export const firebaseConfig = {
  apiKey: "AIzaSyDPsHKDF7PfaCzkD5Mdj-3zMzP0XOIoOgU",
  authDomain: "whimsical-notes.firebaseapp.com",
  projectId: "whimsical-notes",
  storageBucket: "whimsical-notes.appspot.com",
  messagingSenderId: "885102998221",
  appId: "1:885102998221:web:32f660a07385fd1171af84",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
