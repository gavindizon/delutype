import type { NextPage } from "next";
import Layout from "../../components/Layout/Layout";
import { useRouter } from "next/router";
import general from "../../data/general.json";
import useLanguage from "../../hooks/useLanguage";
import React, { useEffect } from "react";
import { useState } from "react";
import CalibrationButton from "../../components/CalibrationButton/calibrationButton";
import { useSelector, useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { GiRoundStrawBale } from "react-icons/gi";

const Calibration: NextPage = () => {
    const router = useRouter();
    const state = useSelector((state: any) => state);
    const { user } = useAuth();
    const { layout } = router.query;
    const { showWPM } = router.query;
    const dispatch = useDispatch();
    console.log({layout})
    useEffect(() => {
        if (user && !user?.isProfileUnfinished) {
            webgazer.begin();
            dispatch({
                type: "OPEN_MODAL",
                payload: {
                    type: "NOTIFICATION",
                    title: "Calibration",
                    description: "Click on each point 5 times, whilst looking at it until every point turns red.",
                },
            });
        }

        return () => {
            if (user && !user?.isProfileUnfinished) webgazer?.end();
        };
    }, []);

    const lang = useLanguage();
    const genLang = general[lang as keyof typeof general];
    let data = [];
    const [remaining, setRemaining] = useState(9);
    useEffect(() => {
        if (remaining === 1){

            dispatch({
                type: "OPEN_MODAL",
                payload: {
                    type: "NOTIFICATION",
                    title: "One More Step!",
                    description: "Click on the center point 5 times, whilst looking at it to end calibration.",
                },
            });
        }
          

        if (remaining === 0) {
            dispatch({
                type: "OPEN_MODAL",
                payload: {
                    type: "NOTIFICATION",
                    title: "Calibration Finished!",
                    description: "Click Proceed to continue with the typing test.",
                    redirectTo: `/test?layout=${layout}&showWPM=${showWPM}`,
                    redirectToLabel: "Proceed",
                },
            });
        }
    }, [remaining]);
    return (
        <Layout title="Calibration" description="" lang={lang}>
            <section>
                <h3 className="text-center text-3xl pt-10">Calibration</h3>

                <div className="flex flex-row h-fit py-5 w-full justify-between">
                    <CalibrationButton id="btn1" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn2" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn3" setRemaining={setRemaining}></CalibrationButton>
                </div>

                <div className="flex flex-row h-fit pt-80 2xl:pt-96 w-full justify-between">
                    <CalibrationButton id="btn4" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn5" hide={remaining > 1} setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn6" setRemaining={setRemaining}></CalibrationButton>
                </div>

                <div className="flex flex-row h-fit fixed bottom-10 w-full justify-around pl-56 xl:pl-12 2xl:pr-36">
                    <CalibrationButton id="btn7" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn8" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn9" setRemaining={setRemaining}></CalibrationButton>
                </div>
            </section>
        </Layout>
    );
};

export default Calibration;
