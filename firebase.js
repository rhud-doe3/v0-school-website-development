// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCo9GvSN38ZkiWDBUHieOs6dR6BmKEwOlE",
  authDomain: "admin-login-c496b.firebaseapp.com",
  projectId: "admin-login-c496b",
  storageBucket: "admin-login-c496b.firebasestorage.app",
  messagingSenderId: "846530959582",
  appId: "1:846530959582:web:b7344aa104e2230a2c8a4f",
  measurementId: "G-2WNQFK53GZ"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
auth.useDeviceLanguage();
export { auth };