
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyDs_71cZ48A4khk-SEcO17FEn3TBuCZMLg",
  authDomain: "fir-app-11214.firebaseapp.com",
  projectId: "fir-app-11214",
  storageBucket: "fir-app-11214.firebasestorage.app",
  messagingSenderId: "223201726011",
  appId: "1:223201726011:web:1f686b1b4dae3e78d5561e",
  measurementId: "G-9KJM7NR8LH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider=new GoogleAuthProvider();
export const db=getFirestore(app);
