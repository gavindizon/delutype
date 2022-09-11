import React, { useEffect, FC, useState } from "react";
import { useRouter } from "next/router";
import useAuth from "../../hooks/useAuth";
import Loading from "../Indicator/Loading";
import redirects from "../../data/redirects.json";
import { useDispatch } from "react-redux";

type Props = {
    children: any;
};

const AuthGuard: FC<Props> = ({ children }) => {
    const [authorized, setAuthorized] = useState(false);
    const { user } = useAuth();
    const router = useRouter();
    const dispatch = useDispatch();

    const authCheck = (path: string) => {
        path = path.split("?")[0];
        if (user?.isProfileUnfinished && redirects["profileNotFinished"].includes(path)) {
            setAuthorized(false);
            dispatch({
                type: "CLOSE_MODAL",
            });
            dispatch({
                type: "OPEN_MODAL",
                payload: {
                    type: "NOTIFICATION",
                    title: "Finish your Profile",
                    description: "Make sure to finish your profile before you start taking your typing tests",
                },
            });
            router.push("/profile/edit");
        }
        if (user && redirects["authenticated"].includes(path)) {
            setAuthorized(false);

            router.push("/", "/");
        }

        if (user === null && redirects["unauthenticated"].includes(path)) {
            setAuthorized(false);
            dispatch({
                type: "CLOSE_MODAL",
            });
            dispatch({
                type: "OPEN_MODAL",
                payload: {
                    type: "LOGIN",
                },
            });

            router.push("/", "/");
        }

        setAuthorized(true);
    };

    useEffect(() => {
        // on initial load - run auth check
        authCheck(router.asPath);

        // on route change start - hide page content by setting authorized to false
        const hideContent = () => setAuthorized(false);
        router.events.on("routeChangeStart", hideContent);

        // on route change complete - run auth check
        router.events.on("routeChangeComplete", authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off("routeChangeStart", hideContent);
            router.events.off("routeChangeComplete", authCheck);
        };

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <>
            {" "}
            {!authorized ? (
                <div className="h-screen w-full flex justify-center items-center">
                    <Loading size={"2xl"} />
                </div>
            ) : (
                children
            )}
        </>
    );
};

export default AuthGuard;
