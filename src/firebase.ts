import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiEtWTkecbE5eiJJkzdtKi9DWBfyqXYsk",
  authDomain: "dogs-6e5d2.firebaseapp.com",
  projectId: "dogs-6e5d2",
  storageBucket: "dogs-6e5d2.firebasestorage.app",
  messagingSenderId: "463147344343",
  appId: "1:463147344343:web:7d3bc6bfb48fe6e2c4ab92",
  measurementId: "G-TB0WEYCTN7"
};

const firebaseApp = initializeApp(firebaseConfig);
export const auth = getAuth(firebaseApp);
export const googleProvider = new GoogleAuthProvider();

export default firebaseApp;
