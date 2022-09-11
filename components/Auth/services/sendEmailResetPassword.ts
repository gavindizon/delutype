import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../../services/firebase/firebaseClient";

const sendEmailResetPassword = async (email: string) => {
    try {
        await sendPasswordResetEmail(auth, email);
        return { status: "success" };
    } catch (e) {
        return { status: "failed", error: e };
    }
};

export default sendEmailResetPassword;
