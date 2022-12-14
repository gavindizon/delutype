import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import * as firebaseFirestore from "firebase/firestore";
import { inMemoryPersistence } from "firebase/auth";
import { Firestore } from "firebase/firestore";

const firebaseConfig: firebase.FirebaseOptions = {
    apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSENGER_SENDER_ID,
    appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};
let auth: firebaseAuth.Auth;
let firestore: Firestore;

if (typeof window !== "undefined" && !firebase.getApps().length) {
    const client = firebase.initializeApp(firebaseConfig, "CLIENT");
    auth = firebaseAuth.getAuth(client);
    firestore = firebaseFirestore.getFirestore(client);
    auth.setPersistence(inMemoryPersistence);
}

export { firebase, auth, firestore };
