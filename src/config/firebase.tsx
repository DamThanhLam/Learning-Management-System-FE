// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBvZMk7QziNu816WYQ06KwSNAyZjlNfBNw",
  authDomain: "lms-app-82274.firebaseapp.com",
  projectId: "lms-app-82274",
  storageBucket: "lms-app-82274.firebasestorage.app",
  messagingSenderId: "408370445101",
  appId: "1:408370445101:web:65d8354482d7d18998b1a4",
  measurementId: "G-M2YMEY8C12"
};
export const actionCodeSettings = {
  url: 'http://localhost:3000',
  handleCodeInApp: true,
 
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

