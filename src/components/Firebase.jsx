// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCYivGaLEZBLN5U_v2-DC6M53YqeVaU7Ig",
  authDomain: "quantumx-8dfd8.firebaseapp.com",
  projectId: "quantumx-8dfd8",
  storageBucket: "quantumx-8dfd8.appspot.com",
  messagingSenderId: "624673803802",
  appId: "1:624673803802:web:a4a3402f2fe86522db0ba3",
  measurementId: "G-J5K2NYYWD2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);