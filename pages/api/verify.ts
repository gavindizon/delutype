import type { NextApiRequest, NextApiResponse } from "next";
import { FirebaseError } from "firebase-admin";
import firebaseAdmin from "../../services/firebase/firebaseAdmin";
import { destroyCookie } from "nookies";
import { User } from "firebase/auth";

const handler = async (req: NextApiRequest, res: NextApiResponse<any>) => {
    try {
        const user = await firebaseAdmin.auth().verifyIdToken(req.body?.token);
        const token = await firebaseAdmin.auth().createCustomToken(user.uid);

        return res.status(200).json({ user, token });
    } catch (e: unknown) {
        switch ((e as FirebaseError)?.code) {
            case "auth/id-token-expired":
            default:
                destroyCookie(undefined, "token");
                return res.status(500).json({ message: "Cookie expired", code: "EXPIRED_TOKEN" });
        }
    }
};

export default handler;
