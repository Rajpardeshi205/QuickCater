import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBNTicq95n3cMp0qu-9Iv4JAgHj8SEg0eQ",
  authDomain: "quickcater.firebaseapp.com",
  projectId: "quickcater",
  storageBucket: "quickcater.appspot.com",
  messagingSenderId: "835554752575",
  appId: "1:835554752575:web:da0070fe5372f22076e08a",
};

const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { fireDB, auth, db };
