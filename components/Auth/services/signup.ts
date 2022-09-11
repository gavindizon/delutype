import axios from "axios";
import nookies from "nookies";

import { auth } from "../../../services/firebase/firebaseClient";
import { updateProfile, createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";

const signup = async (email: string, password: string, username: string) => {
    let { user } = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user, {
        displayName: username,
    });

    await axios.post("/api/claims", { user: { ...user, displayName: username } });
    await sendEmailVerification(user);
    nookies.destroy(undefined, "token");
};

export default signup;
