import * as admin from "firebase-admin";

let adminApp: admin.app.App;

if (!admin.apps.length) {
    adminApp = admin.initializeApp(
        {
            credential: admin.credential.cert({
                privateKey: JSON.parse(String(process.env.NEXT_PUBLIC_FIREBASE_SERVICE_PRIVATE_KEY))?.privateKey,
                clientEmail: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_CLIENT_EMAIL,
                projectId: process.env.NEXT_PUBLIC_FIREBASE_SERVICE_PROJECT_ID,
            }),
        },
        "SERVER"
    );
} else {
    adminApp = admin.app("SERVER");
}

export default adminApp;
