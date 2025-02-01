import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { signInWithPopup } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyD170LfxOaz7fPGORP1GcG7cU-q5S_NI3Y",
  authDomain: "netfilms-22es.firebaseapp.com",
  projectId: "netfilms-22es",
  storageBucket: "netfilms-22es.firebasestorage.app",
  messagingSenderId: "356490164480",
  appId: "1:356490164480:web:e90ce14dbb958d99805be5",
  measurementId: "G-XQ4EN017KV",
};

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log("User Info", result.user);
    return result.user;
  } catch (error) {
    console.error("Error during sign-in", error);
  }
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
