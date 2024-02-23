
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDSAGwF_f7WVxbzn79bLHOnolaUBieVQf0",
  authDomain: "binsa-5b6ab.firebaseapp.com",
  projectId: "binsa-5b6ab",
  storageBucket: "binsa-5b6ab.appspot.com",
  messagingSenderId: "918898827930",
  appId: "1:918898827930:web:ca49797d00074b13093523"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);