import * as firebase from "firebase/app";
import * as firebaseAuth from "firebase/auth";
import { inMemoryPersistence } from "firebase/auth";

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

if (typeof window !== "undefined" && !firebase.getApps().length) {
    const client = firebase.initializeApp(firebaseConfig, "CLIENT");
    auth = firebaseAuth.getAuth(client);
    auth.setPersistence(inMemoryPersistence);
}

export { firebase, auth };
