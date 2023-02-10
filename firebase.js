
import * as firebase from "firebase";
// import {drugDataFirestore} from "./assets/drugDataFirestore";

const firebaseConfig = {
  apiKey: "AIzaSyBHg5dGp5pX4_liFC6PGoA-AR9IibmTvzQ",
  authDomain: "pharmacy-project-a9cef.firebaseapp.com",
  projectId: "pharmacy-project-a9cef",
  storageBucket: "pharmacy-project-a9cef.appspot.com",
  messagingSenderId: "566501899324",
  appId: "1:566501899324:web:e8686e5add8dca7ca51739"
};

let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig);
} else {
  app = firebase.app()
}

const auth = firebase.auth();
const firestore = firebase.firestore();
const createUserDocument = async (user, additionalData) => {
  if (!user) {
    return;
  }
  console.log(additionalData)
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();

  if(!snapshot.exists) {
    const {email} = user;
    const {name, userType} = additionalData;
    
    try {
      userRef.set({
        name,
        email,
        userType,
        createdAt: new Date(),
      })
    }
    catch (err) {
      alert(err.message)
    }
  }
}

// drugDataFirestore(app);

export { auth, firestore, createUserDocument }; // app, 