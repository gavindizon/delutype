import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import Layout from "../components/Layout/Layout";
import { useDispatch, useSelector } from "react-redux";

import React from "react";
import Researcher from "../components/Researcher/Researcher";
import { BsGlobe } from 'react-icons/bs'
import Image from "next/image";

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
                <div className="w-3/4 max-w-5xl space-y-24 font-default">
                    <div className="flex flex-col space-y-20 items-center">
                        <h1 className="font-extrabold text-4xl leading-tight xs:text-5xl xs:leading-snug">
                            Designing an optimized Filipino-English keyboard layout
                        </h1>

                        <div className="grid grid-cols-2 gap-8 sm:gap-12 md:grid-cols-4 md:gap-5 lg:gap-20">
                            <Researcher
                                name="Gavin Dizon"
                                imageURL="/images/gavin.jpeg"
                                githubURL="https://github.com/gavindizon"
                                linkedInURL="https://www.linkedin.com/in/gavin-dizon/"
                                websiteURL="https://gavindizon.github.io"
                            />
                            <Researcher
                                name="Vince Esquivel"
                                imageURL="/images/vince.png"
                                githubURL="https://github.com/VinceEsquivel"
                                linkedInURL="https://www.linkedin.com/in/vinceesquivel/"
                            />
                            <Researcher
                                name="Mark Lim"
                                imageURL="/images/mark.jpeg"
                                githubURL="https://github.com/kram46"
                                linkedInURL="https://www.linkedin.com/in/mark-willbur-lim/"
                            />
                            <Researcher
                                name="Riley Uy"
                                imageURL="/images/riley.jpg"
                                githubURL="https://github.com/rileyuy"
                                linkedInURL="https://www.linkedin.com/in/riley-uy/"
                                websiteURL="https://rileyuy.github.io"
                            />
                        </div>
                    </div>

                    <div className="flex flex-col space-y-12">
                        <div className="flex flex-col space-y-8">
                            <h2 className="font-bold text-2xl">Abstract</h2>
                            <p className="font-regular text-xl">
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
                            </p>
                        </div>

                        <div className="flex flex-col space-y-8">
                            <h2 className="font-bold text-2xl">Keywords</h2>
                            <p className="font-regular text-xl">
                                Keyboard Layout, QWERTY, Optimization, Computational Method, Integer Programming
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col space-y-8">
                        <h2 className="font-extrabold text-4xl leading-tight text-center xs:text-5xl xs:leading-snug xl:text-left">Our Adviser</h2>

                        <div className="flex flex-col items-center xl:flex-row">
                            <div className="flex flex-col items-center w-full space-y-12">
                                <div className="overflow-hidden rounded-full overflow-hidden relative h-72 w-72 rounded-full">
                                    <Image
                                        src={"/images/briane.jpeg"}
                                        alt="404"
                                        objectFit="contain"
                                        objectPosition={"center"}
                                        layout="fill"
                                    />
                                </div>
                                <h2 className="font-bold text-2xl">Briane Paul V. Samson</h2>
                                <div className="flex flex-row">
                                    <Link href="https://brianesamson.com/">
                                        <a className="text-3xl">
                                            <BsGlobe />
                                        </a>
                                    </Link>
                                </div>
                            </div>

                            <div className="flex-auto space-y-8 mt-12 xl:ml-20 xl:mt-0">
                                <p className="font-regular text-xl">
                                    Briane Paul V. Samson is an Associate Professor of Computer Science and Informatics, 
                                    and currently the Chair of the Department of Software Technology in the College of Computer 
                                    Studies at De La Salle University. He directs the Center for Complexity and Emerging
                                    Technologies (COMET) and concurrently serves as the Deputy Director of the Dr. Andrew L. Tan
                                    Data Science Institute. His research focuses on the integration of human-computer interaction
                                    and complex systems research in developing civic media and technologies that promotes prosocial
                                    behavior. He develops human-centered and interactive technologies that are designed to improve
                                    one&aposs personal productivity and well-being, and to assess and manage urban mobility, 
                                    transportation services, and disaster preparedness and response. At the same time, he 
                                    investigates the underlying and complex dynamics of sociotechnical systems (e.g. crowds, social
                                    networks), especially with the introduction of technological solutions. Currently, Briane is
                                    focused on rethinking navigation applications as a civic technology that encourages drivers to
                                    follow unselfish routes, which could help them develop sustainable mobility patterns.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default About;
