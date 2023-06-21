// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,  
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword
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


const googleProvider = new GoogleAuthProvider();
googleProvider.setCustomParameters({
    prompt: 'select_account',
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);



export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, 
  additionalInformation = {}
  ) => {
  const userDocRef = doc(db, 'user', userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      });
    } catch (error) {
      console.log('error creating user', error.message);
    }
  }
  return userDocRef;
}

/* Handle user with e-mail and password */



export const createAuthUserwithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);

}

export const signInUsingEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
}