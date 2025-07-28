// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWX59df7GjQYDQoBcB7_bYQKGG-hRKcQI",
  authDomain: "fir-3ae69.firebaseapp.com",
  projectId: "fir-3ae69",
  storageBucket: "fir-3ae69.firebasestorage.app",
  messagingSenderId: "437766359642",
  appId: "1:437766359642:web:5ec996780546a30c42a663",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export { auth, provider };
