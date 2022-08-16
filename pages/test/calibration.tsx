import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import { axiosInstance as axios } from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout";

import Script from "next/script";

import general from "../../data/general.json";
import useLanguage from "../../hooks/useLanguage";
import TypingGame from "../../components/TypingGame";
//import webgazer from "../../webgazer-v2/src/index.mjs";
import React, { useEffect } from "react";
import { useState } from "react";
import CalibrationButton from "../../components/CalibrationButton/calibrationButton";
import Modal from "../../components/Modal/Modal";
const Calibration: NextPage = ({ ssr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {

    useEffect(() => {
        webgazer.begin();
    
        return () => {
          webgazer.end();
        };
      }, []);

    const [gazeCount, setGazeCount] = useState(0);
    const lang = useLanguage();
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const genLang = general[lang as keyof typeof general];
    let data = [];

    const [remaining, setRemaining] = useState(9)

    // useEffect(() => {
      
    //         dispatch({ type: "OPEN_MODAL" });
        
    //   }, []);

    // useEffect(() => {
      
    //     if (remaining === 0){

    //         dispatch({ type: "OPEN_MODAL" });

    //     }
    
    //   }, [remaining]);
    
    return (
        
        

        <Layout title="Calibration" description="" lang={lang} state={state} dispatch={dispatch}>
           
            <section>
                <h3 className="text-center text-3xl pt-10">Calibration</h3>
            
            <div className="flex flex-row h-fit py-5 w-full justify-between">
    
            <CalibrationButton  id="btn1"  setRemaining={setRemaining}></CalibrationButton>
                
            <CalibrationButton   id="btn2" setRemaining={setRemaining}></CalibrationButton>
            
            <CalibrationButton   id="btn3" setRemaining={setRemaining}></CalibrationButton>
           
            </div>

            <div className="flex flex-row h-fit pt-96 w-full justify-between">

            <CalibrationButton  id="btn4" setRemaining={setRemaining}></CalibrationButton>

            <CalibrationButton  id="btn5" hide={remaining > 1} setRemaining={setRemaining}></CalibrationButton>
       
            <CalibrationButton  id="btn6" setRemaining={setRemaining}></CalibrationButton>
           
            </div>  

            <div className="flex flex-row h-fit fixed bottom-10 w-full justify-around pl-56 xl:pl-12 2xl:pr-24">
       
            <CalibrationButton   id="btn7" setRemaining={setRemaining}></CalibrationButton>
          
            <CalibrationButton   id="btn8" setRemaining={setRemaining}></CalibrationButton>
           
            <CalibrationButton   id="btn9" setRemaining={setRemaining}></CalibrationButton>
          
            </div> 

            </section>

        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        const data = 1;
        //const { data } =  //await axios.get("https://pokeapi.co/api/v2/pokemon/ditto");
        return {
            props: {
                ssr: data,
            },
        };
    } catch (e) {
        return {
            props: {},
        };
    }
};
export default Calibration;
