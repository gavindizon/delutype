import type { NextPage } from "next";
import Layout from "../../components/Layout/Layout";

import useLanguage from "../../hooks/useLanguage";
import React, { useEffect } from "react";
import { useState } from "react";
import CalibrationButton from "../../components/CalibrationButton/calibrationButton";
import { useDispatch } from "react-redux";
import useAuth from "../../hooks/useAuth";

const Calibration: NextPage = () => {
    const { user } = useAuth();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user && !user?.isProfileUnfinished) {
            webgazer.begin();
            dispatch({
                type: "OPEN_MODAL",
                payload: {
                    type: "NOTIFICATION",
                    title: "Calibration",
                    description: "Click on each point 5 times, while looking at it until every point turns red.",
                },
            });
        }

        return () => {
            if (user && !user?.isProfileUnfinished) webgazer?.end();
        };
    }, []);

    const lang = useLanguage();
    const [remaining, setRemaining] = useState(9);

    useEffect(() => {
        if (remaining === 1) {
            dispatch({
                type: "OPEN_MODAL",
                payload: {
                    type: "NOTIFICATION",
                    title: "One More Step!",
                    description: "Click on the center point 5 times, while looking at it to end calibration.",
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
                    redirectTo: `/test`,
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

                <div className="flex flex-row fixed top-1/2 lg:relative lg:py-80 items-center w-full justify-between">
                    <CalibrationButton id="btn4" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton
                        id="btn5"
                        hide={remaining > 1}
                        setRemaining={setRemaining}
                        onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                    ></CalibrationButton>

                    <CalibrationButton id="btn6" setRemaining={setRemaining}></CalibrationButton>
                </div>

                <div className="flex flex-row h-fit fixed bottom-10 w-full justify-around pl-56 xl:pl-32 2xl:pr-24">
                    <CalibrationButton id="btn7" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn8" setRemaining={setRemaining}></CalibrationButton>

                    <CalibrationButton id="btn9" setRemaining={setRemaining}></CalibrationButton>
                </div>
            </section>
        </Layout>
    );
};

export default Calibration;
