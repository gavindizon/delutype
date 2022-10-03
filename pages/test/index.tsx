import type { NextPage } from "next";

import Layout from "../../components/Layout/Layout";
import useLanguage from "../../hooks/useLanguage";
import TypingGame from "../../components/TypingGame";
import latinSquare from "../../data/latinSquare.json";
import text from "../../data/text.json";
import translation from "../../data/field-labels.json";

import React, { useEffect, useState } from "react";

const Test: NextPage = () => {
    const lang = translation[useLanguage() as keyof typeof translation];
    const [userData, setUserData] = useState<any>({});
    const [testValue, setTestValue] = useState<string>("english-100");

    useEffect(() => {
        if (window) setUserData(JSON.parse(localStorage.getItem("userData") as string));
    }, []);

    useEffect(() => {
        if (userData?.code) setTestValue(latinSquare[userData?.code as keyof typeof latinSquare][userData?.stage || 0]);
    }, [userData]);

    return (
        <Layout title="Test" description="" lang={useLanguage()}>
            <section className="min-h-screen px-2 text-center flex flex-col justify-center items-center relative">
                <div className="w-full md:w-3/5">
                    <h1 className="mb-2">{lang[testValue as keyof typeof lang]}</h1>
                    <TypingGame text={text[testValue as keyof typeof text]} />
                </div>
            </section>
        </Layout>
    );
};

export default Test;
