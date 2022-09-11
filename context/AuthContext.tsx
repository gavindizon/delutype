import { createContext, useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import nookies from "nookies";

import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import { auth, firestore } from "../services/firebase/firebaseClient";
import { collection, query, where, getDocs } from "firebase/firestore";
import { updateProfile, getRedirectResult } from "firebase/auth";

import sendEmailResetPassword from "../components/Auth/services/sendEmailResetPassword";
import signup from "../components/Auth/services/signup";
import login from "../components/Auth/services/login";
import loginWithGoogle from "../components/Auth/services/loginWithGoogle";
import verifyEmail from "../components/Auth/services/verifyEmail";
import resetPassword from "../components/Auth/services/resetPassword";
import logout from "../components/Auth/services/logout";
import COOKIE_OPTION from "../components/Auth/utils/cookieOption";

import Loading from "../components/Indicator/Loading";

export const AuthContext = createContext<any>({});

export function AuthProvider({ children }: any) {
    const router = useRouter();
    const [provider, setProvider] = useState<"" | "google" | "password">("");
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const redirectResult = async () => {
            try {
                const result = await getRedirectResult(auth);
                if (result?.providerId === "google.com") {
                    setUser({
                        email: result.user.email,
                        photoURL: result.user.photoURL,
                        displayName: result.user.displayName,
                        uid: result.user.uid,
                    });
                    setProvider("google");
                    setIsLoggingIn(true);
                    let snapshot = await getDocs(
                        query(collection(firestore, "users"), where("email", "==", result.user.email))
                    );

                    let queryResult: any = [];
                    snapshot?.forEach((doc) => {
                        queryResult.push({ ...doc.data(), id: doc.id });
                    });
                    if (queryResult.length === 0) {
                        setIsLoggingIn(false);
                        dispatch({
                            type: "OPEN_MODAL",
                            payload: {
                                type: "NOTIFICATION",
                                title: "Finish your Profile",
                                description:
                                    "Make sure to finish your profile before you start taking your typing tests",
                            },
                        });

                        setUser((user: any) => {
                            return { ...user, isProfileUnfinished: true };
                        });
                    }
                    setIsLoggingIn(false);

                    if (result.user.displayName !== queryResult[0].username) {
                        await updateProfile(result.user, { displayName: queryResult[0].username });

                        let customUserClaims = {
                            uid: result.user.uid,
                            email: result.user.email,
                            photoURL: result.user.photoURL,
                            displayName: queryResult[0].username,
                            providerData: result.user.providerData,
                        };

                        await axios.post("/api/claims", {
                            user: customUserClaims,
                        });
                    }
                }

                return { status: "success" };
            } catch (e) {
                return { status: "error", error: e };
            }
        };

        redirectResult();
    }, []);

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            try {
                if (!user) {
                    const { token } = nookies.get();
                    if (!token) {
                        nookies.destroy(undefined, "token", COOKIE_OPTION);
                        setUser(null);
                        setProvider("");
                    } else {
                        const { data } = await axios.post("/api/verify", { token });
                        setUser({
                            email: data.user.email,
                            uid: data.user.uid,
                            displayName: data.user?.displayName || data.user?.name,
                            photoUrl: data.user.picture,
                        });
                    }
                } else {
                    const token = await user.getIdToken(true);
                    setUser((user: any) => {
                        return {
                            ...user,
                            email: user?.email,
                            uid: user?.uid,
                            displayName: user?.displayName || user?.email,
                            photoUrl: user?.photoURL,
                        };
                    });

                    nookies.set(undefined, "token", token, COOKIE_OPTION);
                }
            } catch (e) {
                let error: any = (e as AxiosError)?.response?.data;
                console.error(error);
                switch (error?.code) {
                    case "TOKEN_EXPIRED":
                    default:
                        nookies.destroy(undefined, "token", COOKIE_OPTION);
                }
                setUser(null);
                setProvider("");
            } finally {
                setLoading(false);
            }
        });
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                provider,
                setProvider,
                signup,
                login,
                loginWithGoogle,
                logout,
                loading,
                isLoggingIn,
                setIsLoggingIn,
                resetPassword,
                verifyEmail,
                sendEmailResetPassword,
            }}
        >
            {loading ? (
                <div className="h-screen w-full flex justify-center items-center">
                    <Loading size={"2xl"} />
                </div>
            ) : (
                children
            )}
        </AuthContext.Provider>
    );
}
