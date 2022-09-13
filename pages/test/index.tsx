import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout";
import general from "../../data/general.json";
import useLanguage from "../../hooks/useLanguage";
import TypingGame from "../../components/TypingGame";
import React, { useState, useEffect } from "react";

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
        const data = 1;
        return {
            props: {
                title: "Lorem ipsum title",
                text: "The quick brown fox jumps over the lazy dog.",
            },
        };
    } catch (e) {
        return {
            props: {},
        };
    }
};

export default Test;
