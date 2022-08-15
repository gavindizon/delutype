import { createContext, useEffect, useState } from "react";
import nookies from "nookies";
import { auth } from "../services/firebase/firebaseClient";
import { getAuth, User as FirebaseUser } from "firebase/auth";
import { clearInterval } from "timers";

const AuthContext = createContext<{ user: FirebaseUser | null }>({
    user: null,
});

export function AuthProvider({ children }: any) {
    const [user, setUser] = useState<FirebaseUser | null>(null);

    useEffect(() => {
        return auth.onIdTokenChanged(async (user) => {
            if (!user) {
                setUser(null);
                nookies.set(undefined, "token", "");
            } else {
                const token = await user.getIdToken();
                setUser(user);
                nookies.set(undefined, "token", token);
            }
        });
    }, []);

    // refresh
    useEffect(() => {
        const handle = setInterval(async () => {
            const user = auth.currentUser;
            if (user) await user.getIdToken(true);
        }, 10 * 60 * 1000);
        return () => clearInterval(handle);
    }, []);

    return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
