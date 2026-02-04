import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBrMsb0vk55Xk52IcD-aARnfVh9IntOwrg",
  authDomain: "homeservice-b45dc.firebaseapp.com",
  projectId: "homeservice-b45dc",
  storageBucket: "homeservice-b45dc.firebasestorage.app",
  messagingSenderId: "455369540462",
  appId: "1:455369540462:web:d5252efb6b3752846db77f",
  measurementId: "G-62JJNNL4YF"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);