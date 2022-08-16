// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCs7B_Ke_OxTCVblP848na9kEZ4PYbdHsE",
  authDomain: "tea-blog-66904.firebaseapp.com",
  projectId: "tea-blog-66904",
  storageBucket: "tea-blog-66904.appspot.com",
  messagingSenderId: "819799152974",
  appId: "1:819799152974:web:c6c57ba33e67d98008a61f",
  measurementId: "G-FFPYD6ZY8C"
};

// Initialize Firebase
export const firebase = initializeApp(firebaseConfig);
export const firestore = getFirestore(firebase);

export const auth = getAuth(firebase);


export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
