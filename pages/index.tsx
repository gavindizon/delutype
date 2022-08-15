import type { NextPage, GetServerSideProps, InferGetServerSidePropsType } from "next";
import { axiosInstance as axios } from "../config/axios";
import { useDispatch, useSelector } from "react-redux";

import Layout from "../components/Layout/Layout";
import Button from "../components/Button/Button";

import { FaChevronDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CgMail } from "react-icons/cg";
import { IoPersonCircleSharp } from "react-icons/io5";

import home from "../data/home.json";
import general from "../data/general.json";
import useLanguage from "../hooks/useLanguage";

const Home: NextPage = ({ ssr }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const lang = useLanguage();
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const genLang = general[lang as keyof typeof general];
    const pageLang = home[lang as keyof typeof home];

    return (
        <Layout title="Home" description="" lang={lang} state={state} dispatch={dispatch}>
            <section className="h-screen px-2 text-center flex flex-col -mt-6 justify-center items-center relative">
                <h1 className="text-4xl md:text-7xl mb-4">
                    <span className="font-bold">DELU</span>Type
                </h1>
                <p className="font-light text-lg md:text-xl tracking-wider">{pageLang.hero.subtitle}</p>
                <div className="mt-8 flex flex-col items-center gap-4 w-full">
                    <Button onClick={() => dispatch({ type: "OPEN_MODAL" })} leftIcon={<CgMail size={18} />}>
                        {genLang["sign-in-email"]}
                    </Button>
                    <Button href={"/sign-in"} leftIcon={<FcGoogle size={18} />}>
                        {genLang["sign-in-google"]}
                    </Button>
                    <Button href={"/sign-up"} leftIcon={<IoPersonCircleSharp size={18} />}>
                        {genLang["create-an-account"]}
                    </Button>
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

export default Home;
