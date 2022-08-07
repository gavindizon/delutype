import type {
  NextPage,
  GetServerSideProps,
  InferGetServerSidePropsType,
} from "next";
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

const Test: NextPage = ({
  ssr,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const [gazeCount, setGazeCount] = useState(0);
  const lang = useLanguage();
  const state = useSelector((state: any) => state);
  const dispatch = useDispatch();
  const genLang = general[lang as keyof typeof general];
  let data = [];

  useEffect(() => {
    window.addEventListener("addGaze", function () {
      setGazeCount((prev) => prev + 1);
      //data.push(gazeCount);
      //console.log(gazeCount);
    });
  }, []);

  return (
    <Layout
      title="Test"
      description=""
      lang={lang}
      state={state}
      dispatch={dispatch}
    >
      {/* <Script src="/test.js" strategy="beforeInteractive" /> */}
      <section className="h-screen px-2 text-center flex flex-col -mt-6 justify-center items-center relative">
        <h3>Gaze Counts: {gazeCount}</h3>

        <div className="w-full md:w-1/2">
          <h1 className="mb-2">Charles Darwin, On the Origin of Species</h1>
          <TypingGame
            text={
              "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat eum, qui nulla culpa dignissimos soluta excepturi omnis possimus repudiandae, incidunt molestias? Eius aperiam accusamus unde laboriosam totam. Voluptatum, accusamus eius!"
            }
          />
          
          {/* <TypingGame
            text={
              "Lorem ipsum dolor sit amet"
            }
          /> */}
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
