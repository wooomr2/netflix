import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API,
  authDomain: "netflix-aba8a.firebaseapp.com",
  projectId: "netflix-aba8a",
  storageBucket: "netflix-aba8a.appspot.com",
  messagingSenderId: "371527639964",
  appId: "1:371527639964:web:0bed3adf5ee343718d1e59",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const db = getFirestore();
const auth = getAuth();

export default app;
export { auth, db };
