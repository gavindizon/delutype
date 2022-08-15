
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

const Calibration: NextPage = ({ ssr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const [gazeCount, setGazeCount] = useState(0);

    const lang = useLanguage();
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const genLang = general[lang as keyof typeof general];
    let data = [];


    return (
        <Layout title="Calibration" description="" lang={lang} state={state} dispatch={dispatch}>
            {/* <Script src="/test.js" strategy="beforeInteractive" /> */}
            <section >
                <h3 className="text-center text-3xl pt-10">Calibration</h3>
            
            <div className="flex flex-row h-fit py-5 w-full justify-between">

          
            <CalibrationButton className=""></CalibrationButton>
            
        
            <CalibrationButton className=""></CalibrationButton>
            

            <CalibrationButton className=""></CalibrationButton>
           
            </div>

            <div className="flex flex-row h-fit pt-96 w-full justify-between">

            <CalibrationButton className=""></CalibrationButton>
       
         
            <CalibrationButton className=""></CalibrationButton>
           
            </div>         
            <div className="flex flex-row h-fit fixed bottom-10 w-full justify-around pl-56 xl:pl-12 2xl:pr-20">
       
            <CalibrationButton className=""></CalibrationButton>
          
            <CalibrationButton className=""></CalibrationButton>
           
            <CalibrationButton className=""></CalibrationButton>
          
           
           
        
     
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
