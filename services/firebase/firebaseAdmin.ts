import * as firebaseAdmin from "firebase-admin";

export default firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert({
        privateKey: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_PRIVATE_KEY,
        clientEmail: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_CLIENT_EMAIL,
        projectId: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_PROJECT_ID,
    }),
});
