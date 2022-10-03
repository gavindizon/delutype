import nookies from "nookies";
import { signOut } from "firebase/auth";
import { auth } from "../../../services/firebase/firebaseClient";
import COOKIE_OPTION from "../utils/cookieOption";

const logout = async (router: any) => {
    nookies.destroy(undefined, "token", COOKIE_OPTION);
    localStorage.removeItem("userData");
    await signOut(auth);
    router.push("/", "/");
};

export default logout;
