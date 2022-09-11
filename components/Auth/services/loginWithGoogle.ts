import { auth } from "../../../services/firebase/firebaseClient";
import { GoogleAuthProvider, signInWithRedirect } from "firebase/auth";

const loginWithGoogle = async (languageCode: string = "en") => {
    try {
        const provider = new GoogleAuthProvider();

        auth.languageCode = languageCode;
        await signInWithRedirect(auth, provider);
        return { type: "success" };
    } catch (error) {
        return { type: "error", error };
    }
};

export default loginWithGoogle;
