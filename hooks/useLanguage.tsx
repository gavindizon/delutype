import React, { useState, useEffect } from "react";
import Router, { useRouter } from "next/router";

export default function useLanguage() {
    // defaults to english
    const [language, setLanguage] = useState("en");
    const router = useRouter();
    const { lang } = router.query;

    useEffect(() => {
        setLanguage(localStorage.getItem("lang") || "en");
        if (Router && Router.isReady) {
            if (lang === "en" || lang === "fil") setLanguage(lang);
        }
        console.log(lang);
        //eslint-disable-next-line
    }, [router]);

    return language;
}
