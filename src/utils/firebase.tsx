import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgG2XBWgfUnz3aP97t1xBjVZVtDYk6MdE",
  authDomain: "ferox-513a2.firebaseapp.com",
  databaseURL: "https://ferox-513a2.firebaseio.com",
  projectId: "ferox-513a2",
  storageBucket: "ferox-513a2.appspot.com",
  messagingSenderId: "106985831902",
  appId: "1:106985831902:web:b78cd6f90b51a5b74bb14f",
  measurementId: "G-VCFGB8ELYS",
};

export const firebaseApp = firebase.initializeApp(firebaseConfig);

export const firestoreApp = firebaseApp.firestore();
