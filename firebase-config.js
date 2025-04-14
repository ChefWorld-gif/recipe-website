// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBerXP7-eqgARQFLSwu4WK_ht3hDAuRHSk",
  authDomain: "recipe-website-be7fd.firebaseapp.com",
  projectId: "recipe-website-be7fd",
  storageBucket: "recipe-website-be7fd.firebasestorage.app",
  messagingSenderId: "494730734794",
  appId: "1:494730734794:web:f4163beb4d73b037711833",
  measurementId: "G-9HP5DYLSJM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
