import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import Researcher from "../components/Researcher/Researcher";
import { CgWebsite } from "react-icons/cg";

import home from "../data/home.json";
import general from "../data/general.json";
import useLanguage from "../hooks/useLanguage";
import Link from "next/link";

const About: NextPage = () => {
    const lang = useLanguage();
    const genLang = general[lang as keyof typeof general];
    const pageLang = home[lang as keyof typeof home];

    return (
        <Layout title="About" description="" lang={lang}>
            <div className="flex items-center justify-center my-48">
                <div className="w-3/4 max-w-4xl space-y-24 font-default">
                    <div className="flex-col">
                        <h2 className="font-bold text-2xl mb-8">The Website</h2>
                        <h2 className="font-regular text-xl">
                            DELUType is a typing test website that features tests comprising of Filipino (Tagalog) and
                            English words. It is created for data collection on our thesis:{" "}
                        </h2>
                    </div>

                    <div className="flex-col space-y-20">
                        <h1 className="font-extrabold text-4xl leading-tight xs:text-5xl xs:leading-snug">
                            Designing an optimized Filipino-English keyboard layout
                        </h1>

                        <div className="grid grid-cols-2 gap-8 sm:gap-20 md:grid-cols-4 md:gap-12 lg:gap-20">
                            <Researcher
                                name="Vince Esquivel"
                                imageURL="./images/vince.png"
                                githubURL="https://github.com/VinceEsquivel"
                                linkedinURL="https://www.linkedin.com/in/vinceesquivel/"
                            />
                            <Researcher
                                name="Vince Esquivel"
                                imageURL="./images/vince.png"
                                githubURL="https://github.com/VinceEsquivel"
                                linkedinURL="https://www.linkedin.com/in/vinceesquivel/"
                            />
                            <Researcher
                                name="Vince Esquivel"
                                imageURL="./images/vince.png"
                                githubURL="https://github.com/VinceEsquivel"
                                linkedinURL="https://www.linkedin.com/in/vinceesquivel/"
                            />
                            <Researcher
                                name="Vince Esquivel"
                                imageURL="./images/vince.png"
                                githubURL="https://github.com/VinceEsquivel"
                                linkedinURL="https://www.linkedin.com/in/vinceesquivel/"
                            />
                        </div>
                    </div>

                    <div className="flex-col space-y-12">
                        <div className="flex-col space-y-8">
                            <h2 className="font-bold text-2xl">Abstract</h2>
                            <h2 className="font-regular text-xl">
                                The QWERTY layout has been the standard for computer keyboards for around a century and
                                although it is unoptimized for most languages, including Filipino, it has undergone few
                                alterations. Many alternatives were proposed that are proven to be more effective than
                                the standard keyboard layout. However, there are very few willing to make the
                                adjustment, which remains to be one of the problems that proposed keyboard layouts
                                encounter. Our goal is to create a layout that is optimized for both Filipino (Tagalog)
                                and English while being familiar with QWERTY to get potential users to easily conform to
                                a new layout through the rearrangement of only the letters and punctuations. We would
                                first create a base layout through heuristics, and it will be implemented in a physical
                                keyboard for users to test. It would undergo a cycle of evaluation by the public and
                                professionals and optimization. After optimizing, the new layout iteration would be
                                reimplemented to the physical keyboard for further evaluation. The layout would undergo
                                two evaluation-improvement cycles.
                            </h2>
                        </div>

                        <div className="flex-col space-y-8">
                            <h2 className="font-bold text-2xl">Keywords</h2>
                            <h2 className="font-regular text-xl">
                                Keyboard Layout, QWERTY, Optimization, Computational Method, Integer Programming
                            </h2>
                        </div>
                    </div>

                    <div className="flex-col space-y-8">
                        <h2 className="font-bold text-2xl">Our Adviser</h2>
                        <div className="flex flex-col md:flex-row">
                            <div className="flex-auto w-full h-72 md:w-1/2 md:h-auto lg:h-72 bg-slate-50">
                                <img className="object-cover w-full h-full" src="./images/vince.png" alt="" />
                            </div>

                            <div className="flex-auto space-y-8 mt-12 md:w-1/2 md:mt-0 md:ml-16 lg:w-3/4">
                                <h2 className="font-bold text-2xl">Briane Paul V. Samson</h2>
                                <h2 className="font-regular text-xl">
                                    Briane Samson is an Assistant Professor of Computer Science in the College of
                                    Computer Studies at De La Salle University, and co-directs the Center for Complexity
                                    and Emerging Technologies (COMET). (Placeholder Only)
                                </h2>

                                <div className="flex-row">
                                    <Link href="https://brianesamson.com/">
                                        <a className="text-3xl">
                                            <CgWebsite />
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
