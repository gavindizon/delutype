import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout";
import useLanguage from "../../hooks/useLanguage";
import TypingGame from "../../components/TypingGame";
import React, { useState, useEffect } from "react";
import { getRandomDocument } from "../../services/firebase/queries/getRandomDocument";

const Test: NextPage = ({ text, title }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const lang = useLanguage();
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    return (
        <Layout title="Test" description="" lang={lang}>
            <section className="h-screen px-2 text-center flex flex-col -mt-6 justify-center items-center relative">
                <div className="w-full md:w-1/2">
                    <h1 className="mb-2">{title}</h1>
                    <TypingGame text={text} />
                </div>
            </section>
        </Layout>
    );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    try {
        let res = await getRandomDocument("corpus", 56931);

        return {
            props: {
                title: "Entry #" + res.random,
                text: res.text,
            },
        };
    } catch (e) {
        console.log(e);
        return {
            props: {},
        };
    }
};

export default Test;
