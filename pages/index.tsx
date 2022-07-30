import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Layout from "../components/Layout/Layout";
import { FaChevronDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CgMail } from "react-icons/cg";
import { IoPersonCircleSharp } from "react-icons/io5";
import home from "../data/home.json";
import general from "../data/general.json";
import useLanguage from "../hooks/useLanguage";

const Home: NextPage = () => {
    const lang = useLanguage();
    const genLang = general[lang as keyof typeof general];
    const pageLang = home[lang as keyof typeof home];

    return (
        <Layout title="Home" description="" lang={lang}>
            <section className="h-screen px-2 text-center flex flex-col -mt-6 justify-center items-center relative">
                <h1 className="text-4xl md:text-7xl mb-4">
                    <span className="font-bold">DELU</span>Type
                </h1>
                <p className="font-light text-lg md:text-xl  tracking-wider ">{pageLang.hero.subtitle}</p>
                <div className="mt-8 flex flex-col items-center gap-4 w-full">
                    <Link href="/sign-in">
                        <a className="rounded-md btn uppercase py-2 w-full md:w-96 flex items-center justify-center">
                            <span className="inline-block mr-2">
                                <CgMail size={18} />
                            </span>
                            {genLang["sign-in-email"]}
                        </a>
                    </Link>
                    <Link href="/sign-in">
                        <a className="rounded-md btn uppercase py-2 w-full md:w-96 flex items-center justify-center">
                            <span className="inline-block mr-2">
                                <FcGoogle size={18} />
                            </span>
                            {genLang["sign-in-google"]}
                        </a>
                    </Link>
                    <Link href="/sign-in">
                        <a className="rounded-md btn uppercase py-2 w-full md:w-96 flex items-center justify-center">
                            <span className="inline-block mr-2">
                                <IoPersonCircleSharp size={18} />
                            </span>
                            {genLang["create-an-account"]}
                        </a>
                    </Link>
                </div>

                <button type="button" className="absolute bottom-10 flex flex-col font-thin items-center text-light">
                    {genLang["learn-more"]}
                    <span>
                        <FaChevronDown size={16} />
                    </span>
                </button>
            </section>
        </Layout>
    );
};

export default Home;
