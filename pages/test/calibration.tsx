import type { NextPage } from "next";
import Layout from "../../components/Layout/Layout";

import general from "../../data/general.json";
import useLanguage from "../../hooks/useLanguage";
import React, { useEffect } from "react";
import { useState } from "react";
import CalibrationButton from "../../components/CalibrationButton/calibrationButton";

const Calibration: NextPage = () => {
    useEffect(() => {
        webgazer.begin();

        return () => {
            webgazer.end();
        };
    }, []);

    const lang = useLanguage();
    const genLang = general[lang as keyof typeof general];
    let data = [];
    const [remaining, setRemaining] = useState(9);

    return (
        <Layout title="Calibration" description="" lang={lang}>
            <section>
                <h3 className="text-center text-3xl pt-10">Calibration</h3>

                <div className="flex flex-row h-fit py-5 w-full justify-between">
                    <CalibrationButton id="btn1" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn2" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn3" setRemaining={setRemaining}></CalibrationButton>
                </div>

                <div className="flex flex-row h-fit pt-96 w-full justify-between">
                    <CalibrationButton id="btn4" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn5" hide={remaining > 1} setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn6" setRemaining={setRemaining}></CalibrationButton>
                </div>

                <div className="flex flex-row h-fit fixed bottom-10 w-full justify-around pl-56 xl:pl-12 2xl:pr-24">
                    <CalibrationButton id="btn7" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn8" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn9" setRemaining={setRemaining}></CalibrationButton>
                </div>
            </section>
        </Layout>
    );
};

export default Calibration;
