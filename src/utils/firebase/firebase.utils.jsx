// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider 
    } from "firebase/auth";

import {
  getFirestore,
  doc,
  getDoc,
  setDoc
} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

  apiKey: "AIzaSyC1OzoiY1-lmHVSK2cLkTmuA62w65VL2LU",

  authDomain: "crown-clothing-db-13d0b.firebaseapp.com",

  projectId: "crown-clothing-db-13d0b",

  storageBucket: "crown-clothing-db-13d0b.appspot.com",

  messagingSenderId: "74731270986",

  appId: "1:74731270986:web:3d42687596e2c9f51f87b3"

};


// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);


const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);
export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = doc(db, 'user', userAuth.uid);
  console.log(userDocRef);
  const userSnapshot = await getDoc(userDocRef);

if(!userSnapshot.exists()) {
  const { displayName, email } = userAuth;
  const createdAt = new Date();
  
  try {
    await setDoc(userDocRef, {
      displayName,
      email, 
      createdAt
    });
  } catch (error) {
    console.log('error creating user', error.message);
  }
}

return userDocRef;

}