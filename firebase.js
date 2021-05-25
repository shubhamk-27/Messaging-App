// import config from "./config";
import * as firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEDp3yopQJt7_KcqORKTixAu05DF_3PxQ",
  authDomain: "messaging-app-5d476.firebaseapp.com",
  projectId: "messaging-app-5d476",
  storageBucket: "messaging-app-5d476.appspot.com",
  messagingSenderId: "45812034692",
  appId: "1:45812034692:web:f3b9320d9c57306d1626d1"
};

let app;

if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app();
}

const db = firebase.firestore();
const auth = firebase.auth();

export { db, auth };