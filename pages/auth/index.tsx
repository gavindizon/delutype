import type { NextPage, InferGetServerSidePropsType } from "next";
import { useDispatch } from "react-redux";
import Layout from "../../components/Layout/Layout";

import AuthMode from "../../components/Auth/AuthMode";
import Loading from "../../components/Indicator/Loading";

import useLanguage from "../../hooks/useLanguage";
import useAuth from "../../hooks/useAuth";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Link from "next/link";

const Auth: NextPage = () => {
    const [actionCode, setActionCode] = useState("");
    const [status, setStatus] = useState("");
    const [mode, setMode] = useState("");

    const dispatch = useDispatch();
    const router = useRouter();
    const lang = useLanguage();
    const { verifyEmail } = useAuth();

    useEffect(() => {
        if (router.isReady) {
            setActionCode((router.query.oobCode as any) || "");
            setMode((router.query.mode as any) || "");
        }
    }, [router]);

    useEffect(() => {
        async function checkMode() {
            if (mode === "verifyEmail") {
                let result = await verifyEmail(actionCode);
                setStatus(result?.status);
            }
        }
        checkMode();
    }, [mode]);

    return (
        <Layout title="Home" description="" lang={lang}>
            <section className="h-screen px-2 text-center flex flex-col -mt-6 justify-center items-center relative">
                <AuthMode mode={mode} status={status} setStatus={setStatus} code={actionCode} />
            </section>
        </Layout>
    );
};

export default Auth;
