import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";

import Layout from "../../components/Layout/Layout";

import general from "../../data/general.json";
import useLanguage from "../../hooks/useLanguage";
import TypingGame from "../../components/TypingGame";
//import webgazer from "../../webgazer-v2/src/index.mjs";
import React, { useEffect } from "react";
import { useState } from "react";

const Test: NextPage = () => {
    const lang = useLanguage();
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const genLang = general[lang as keyof typeof general];
    let data = [];

    useEffect(() => {}, []);

    return (
        <Layout title="Test" description="" lang={lang} state={state} dispatch={dispatch}>
            {/* <Script src="/test.js" strategy="beforeInteractive" /> */}
            <section className="h-screen px-2 text-center flex flex-col -mt-6 justify-center items-center relative">
                <h1>Calibration Zone</h1>
            </section>
        </Layout>
    );
};

export default Test;
