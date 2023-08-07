import Firebase from "firebase/compat/app";
import firebaseAuthServices from "firebase/auth";
import "firebase/compat/firestore";
import "firebase/compat/auth"
import "firebase/compat/storage";

const config = {
  apiKey: "AIzaSyAuz-bLbbP9kpJjQDusPEFIJwYieRbiGfs",
  authDomain: "instagram-918c5.firebaseapp.com",
  databaseURL: "https://instagram-918c5-default-rtdb.firebaseio.com",
  projectId: "instagram-918c5",
  storageBucket: "instagram-918c5.appspot.com",
  messagingSenderId: "585265383746",
  appId: "1:585265383746:web:9398d817101ce85f5960db"
}

const firebase = Firebase.initializeApp(config);

const { FieldValue } = Firebase.firestore;

export const storage = firebase.storage();
export { firebase, FieldValue };
