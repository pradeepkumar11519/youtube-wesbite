import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCB0ZVh2TH_31UPA_bynE1mq-F0wGWjjrk",
  authDomain: "cloth-f7986.firebaseapp.com",
  projectId: "cloth-f7986",
  storageBucket: "cloth-f7986.appspot.com",
  messagingSenderId: "7712208385",
  appId: "1:7712208385:web:bb38eba3c99281216df200",
  measurementId: "G-968DGYQLQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
