import { auth } from "../../../services/firebase/firebaseClient";
import { applyActionCode } from "firebase/auth";

const verifyEmail = async (code: string) => {
    try {
        await applyActionCode(auth, code);
        return { status: "success" };
    } catch (e) {
        return { status: "failed", error: e };
    }
};

export default verifyEmail;
