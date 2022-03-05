import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAzPQ4krESBwF5EfC7VowMxuxI1CWv_t5o",
  authDomain: "crypto-site-7c0ab.firebaseapp.com",
  projectId: "crypto-site-7c0ab",
  storageBucket: "crypto-site-7c0ab.appspot.com",
  messagingSenderId: "203819117295",
  appId: "1:203819117295:web:804deed4169e663992091a",
  measurementId: "G-K0CDR28ZPQ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);