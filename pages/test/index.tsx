import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import { axiosInstance as axios } from "../../config/axios";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout";
import Button from "../../components/Button/Button";

import { FaChevronDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CgMail } from "react-icons/cg";
import { IoPersonCircleSharp } from "react-icons/io5";

import general from "../../data/general.json";
import useLanguage from "../../hooks/useLanguage";
import TypingGame from "../../components/TypingGame";
//import webgazer from "../../webgazer-v2/src/index.mjs";
import React, { useEffect } from "react";
import timeout from "../../utils/timeout";

const Test: NextPage = ({ ssr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const lang = useLanguage();
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const genLang = general[lang as keyof typeof general];

    useEffect(() => {
        webgazer
            .setRegression("ridge")
            .setGazeListener(function (data: any, elapsedTime: any) {
                if (data == null) {
                    return;
                }
                var xprediction = data.x; //these x coordinates are relative to the viewport
                var yprediction = data.y; //these y coordinates are relative to the viewport
                console.log(elapsedTime); //elapsed time is based on time since begin was called
            })
            .begin(() => {});
        // webgazer.params.showVideoPreview = true;
    }, []);

    const handleOnClick = () => {};

    return (
        <Layout title="Test" description="" lang={lang} state={state} dispatch={dispatch}>
            <section className="h-screen px-2 text-center flex flex-col -mt-6 justify-center items-center relative">
                <h5>Esc to reset</h5>
                <button onClick={(e) => handleOnClick()}>X</button>
                <div className="w-full md:w-1/2">
                    <h1 className="mb-2">Charles Darwin, On the Origin of Species</h1>
                    <TypingGame
                        text={
                            "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat eum, qui nulla culpa dignissimos soluta excepturi omnis possimus repudiandae, incidunt molestias? Eius aperiam accusamus unde laboriosam totam. Voluptatum, accusamus eius!"
                        }
                    />
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

export default Test;
