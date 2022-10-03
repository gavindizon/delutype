import { signInWithEmailAndPassword } from "firebase/auth";
import { FirebaseError } from "firebase/app";
import { auth, firestore } from "../../../services/firebase/firebaseClient";
import { AnyAction, Dispatch } from "redux";
import { getDocument } from "../../../services/firebase/queries/getDocument";
const login = async (
    email: string,
    password: string,
    setIsLoggingIn: Function,
    dispatch: Dispatch<AnyAction>,
    setUser: Function,
    setProvider: Function
) => {
    try {
        setIsLoggingIn(true);
        let { user } = await signInWithEmailAndPassword(auth, email, password);
        setUser(user);
        setProvider("password");
        setIsLoggingIn(false);

        let userData: any = await getDocument("users", "email", email);
        localStorage.setItem("userData", JSON.stringify(userData));

        dispatch({ type: "CLOSE_MODAL" });
        return { type: "success" };
    } catch (e) {
        setIsLoggingIn(false);
        switch ((e as FirebaseError).code) {
            case "auth/unverified-email":
                return { type: "error", message: "Error: Email not yet verified. Please verify your email." };
            case "auth/user-not-found":
            case "auth/wrong-password":
                return {
                    type: "error",
                    message: "Error: Wrong email or password. Please check if you have input the correct credentials.",
                };
            default:
                return { type: "error", message: "Unknown error: Please try again later." };
        }
    }
};

export default login;
