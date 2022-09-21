import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../../components/Layout/Layout";
import useLanguage from "../../hooks/useLanguage";
import TypingGame from "../../components/TypingGame";
import React, { useState, useEffect } from "react";
import { getRandomDocument } from "../../services/firebase/queries/getRandomDocument";

const Test: NextPage = () => {
    const { settings } = useSelector((state: any) => state);

    const lang = useLanguage();
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    return (
        <Layout title="Test" description="" lang={lang}>
            <section className="min-h-screen px-2 text-center flex flex-col justify-center items-center relative">
                <div className="w-full md:w-3/5">
                    <h1 className="mb-2">{settings.title}</h1>
                    <TypingGame text={settings.text} />
                </div>
            </section>
        </Layout>
    );
};

// export const getServerSideProps: GetServerSideProps = async (ctx) => {
//     try {
//         let res = await getRandomDocument("corpus", 56931);

//         return {
//             props: {
//                 title: "Entry #" + res.random,
//                 text: "Music is generally defined as the art of arranging sound to create some combination of form, harmony, melody, rhythm or otherwise expressive content. Exact definitions of music vary considerably around the world, though it is an aspect of all human societies, a cultural universal. While scholars agree that music is defined by a few specific elements, there is no consensus on their precise definitions.The creation of music is commonly divided into musical composition, musical improvisation, and musical performance, though the topic itself extends into academic disciplines, criticism, philosophy, and psychology. Music may be performed or improvised using a vast range of instruments, including the human voice. Music often plays a key role in social activities, religious rituals, rite of passage ceremonies, and celebrations. The music industry includes songwriters, performers, sound engineers, producers, tour organizers, distributors of instruments, accessories, and sheet music. Compositions, performances, and recordings are assessed and evaluated by music critics, music journalists, and music scholars, as well as amateurs. In some musical contexts, a performance or composition may be to some extent improvised. For instance, in hindustani classical music, the performer plays spontaneously while following a partially defined structure and using characteristic motifs. In modal jazz the performers may take turns leading and responding while sharing a changing set of notes. In a free jazz context, there may be no structure whatsoever, with each performer acting at their discretion. Music may be deliberately composed to be unperformable, or agglomerated electronically from many performances. Music is played in public and private areas, highlighted at events such as festivals, rock concerts, and orchestra performance, and heard incidentally as part of a score or soundtrack to a film, TV show, or video game. Musical playback is the primary function of a CD player and a universal feature of radios and smartphones.",
//             },
//         };
//     } catch (e) {
//         console.log(e);
//         return {
//             props: {},
//         };
//     }
// };

export default Test;
