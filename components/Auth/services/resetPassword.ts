import { auth } from "../../../services/firebase/firebaseClient";
import { confirmPasswordReset } from "firebase/auth";

const resetPassword = async (password: string, code: string) => {
    try {
        await confirmPasswordReset(auth, code, password);
        return { status: "success" };
    } catch (e) {
        return { status: "failed", error: e };
    }
};

export default resetPassword;
