import { createContext, useEffect, useState } from "react";
import nookies from "nookies";
import { auth } from "../services/firebase/firebaseClient";
import {
    User as FirebaseUser,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    updateProfile,
    sendEmailVerification,
    applyActionCode,
    confirmPasswordReset,
    sendPasswordResetEmail,
} from "firebase/auth";
import axios, { AxiosError } from "axios";
import { FirebaseError } from "firebase/app";

import Loading from "../components/Indicator/Loading";
import { useDispatch } from "react-redux";

export const AuthContext = createContext<any>({});

export function AuthProvider({ children }: any) {
    const dispatch = useDispatch();
    const [user, setUser] = useState<any | null>(null);
    const [loading, setLoading] = useState(true);
    const [isLoggingIn, setIsLoggingIn] = useState(false);

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            try {
                if (!user) {
                    const { token } = nookies.get();
                    if (!token) {
                        nookies.destroy(undefined, "token");
                        setUser(null);
                    } else {
                        const { data } = await axios.post("/api/verify", { token });

                        setUser({
                            email: data.user.email,
                            uid: data.user.uid,
                            displayName: data.user.providerData[0].displayName,
                            photoUrl: data.user.providerData[0].photoURL,
                        });
                    }
                } else {
                    const token = await user.getIdToken(true);
                    setUser({
                        email: user.email,
                        uid: user.uid,
                        displayName: user.providerData[0].displayName,
                        photoUrl: user.providerData[0].photoURL,
                    });
                    nookies.set(undefined, "token", token);
                }
                setLoading(false);
            } catch (e) {
                let error: any = (e as AxiosError)?.response?.data;
                switch (error?.code) {
                    case "TOKEN_EXPIRED":
                    default:
                        nookies.destroy(undefined, "token");
                }
                setUser(null);
                setLoading(false);
            }
        });
    }, []);

    const signup = async (email: string, password: string, username: string) => {
        let { user } = await createUserWithEmailAndPassword(auth, email, password);
        await updateProfile(user, {
            displayName: username,
        });
        await sendEmailVerification(user);
        nookies.destroy(undefined, "token");
        setUser(null);
    };

    const login = async (email: string, password: string) => {
        try {
            setIsLoggingIn(true);
            let response = await signInWithEmailAndPassword(auth, email, password);
            dispatch({ type: "CLOSE_MODAL" });
            await axios.post("/api/claims", { user: response.user });

            setIsLoggingIn(false);
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
                        message:
                            "Error: Wrong email or password. Please check if you have input the correct credentials.",
                    };
                default:
                    return { type: "error", message: "Unknown error: Please try again later." };
            }
        }
    };

    const verifyEmail = async (code: string) => {
        try {
            await applyActionCode(auth, code);
            return { status: "success" };
        } catch (e) {
            return { status: "failed", error: e };
        }
    };

    const resetPassword = async (password: string, code: string) => {
        try {
            await confirmPasswordReset(auth, code, password);
            return { status: "success" };
        } catch (e) {
            return { status: "failed", error: e };
        }
    };

    const sendEmailResetPassword = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            return { status: "success" };
        } catch (e) {
            return { status: "failed", error: e };
        }
    };

    const logout = async (router: any) => {
        await signOut(auth);
        nookies.destroy(undefined, "token");
        router.push("/");
        router.reload();
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                signup,
                login,
                logout,
                loading,
                isLoggingIn,
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
