import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBPABSDgD5_HmLhXmnByyG-3OcSR8S66YI",
  authDomain: "mcd-training.firebaseapp.com",
  databaseURL: "https://mcd-training-default-rtdb.firebaseio.com",
  projectId: "mcd-training",
  storageBucket: "mcd-training.appspot.com",
  messagingSenderId: "485526086205",
  appId: "1:485526086205:web:bf2eaf622ab96635dcc054",
  measurementId: "G-6V9TMMQLZJ"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);


export { app, auth, db };
