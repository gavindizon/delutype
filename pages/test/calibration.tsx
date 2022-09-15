import type { NextPage } from "next";
import Layout from "../../components/Layout/Layout";

import general from "../../data/general.json";
import useLanguage from "../../hooks/useLanguage";
import React, { useEffect } from "react";
import { useState } from "react";
import CalibrationButton from "../../components/CalibrationButton/calibrationButton";
import { useSelector, useDispatch } from "react-redux";
import NotificationModal from "../../components/Modal/Content/NotificationModal";
import Modal from "../../components/Modal/Modal";
import Link from "next/link";
const Calibration: NextPage = () => {
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    useEffect(() => {
        webgazer.begin();

        return () => {
            webgazer.end();
        };
    }, []);
    useEffect(() => {

        dispatch({type: "OPEN_MODAL", payload: {type: "NOTIFICATION", title:"Calibration", description:"Click on each point 5 times, whilst looking at it until every point turns red."}});
        
        
    }, []) ;

    const lang = useLanguage();
    const genLang = general[lang as keyof typeof general];
    let data = [];
    const [remaining, setRemaining] = useState(9);
    useEffect(() => {

        if (remaining === 1)
        dispatch({type: "OPEN_MODAL", payload: {type: "NOTIFICATION", title:"One More Step!", description:"Click on the center point 5 times, whilst looking at it to end calibration."}});
        
        if (remaining === 0){
            dispatch({type: "OPEN_MODAL", payload: {type: "NOTIFICATION", title:"Calibration Finished!", description:"Click Proceed to continue with the typing test.", redirectTo:"/test", redirectToLabel:"Proceed"}});
        }
       
        
    }, [remaining]) ;
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
