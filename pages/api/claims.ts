import type { NextApiRequest, NextApiResponse } from "next";
import { FirebaseError } from "firebase-admin";
import firebaseAdmin from "../../services/firebase/firebaseAdmin";
import { destroyCookie, setCookie } from "nookies";
import { auth } from "../../services/firebase/firebaseClient";
import { getIdToken, signInWithEmailAndPassword } from "firebase/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
        let { user } = req.body;
        await firebaseAdmin.auth().setCustomUserClaims(user.uid, {
            displayName: user?.displayName,
            photoUrl: user?.photoURL,
            email: user?.email,
            providerData: user?.providerData,
        });
        return res.status(200).json({ status: "success" });
    } catch (e: unknown) {
        return res.status(500).json(e);
    }
};

export default handler;
