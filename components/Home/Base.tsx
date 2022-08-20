import React, { FC } from "react";

import Button from "../Button/Button";

import { FaChevronDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CgMail } from "react-icons/cg";
import { IoPersonCircleSharp } from "react-icons/io5";
import { Dispatch } from "redux";
import useLanguage from "../../hooks/useLanguage";

import home from "../../data/home.json";
import general from "../../data/general.json";

type Props = {
    dispatch: Dispatch;
};

const Base: FC<Props> = ({ dispatch }) => {
    const lang = useLanguage();
    const genLang = general[lang as keyof typeof general];
    const pageLang = home[lang as keyof typeof home];

    return (
        <section className="h-screen px-2 text-center flex flex-col -mt-6 justify-center items-center relative">
            <h1 className="text-4xl md:text-7xl mb-4">
                <span className="font-bold">DELU</span>Type
            </h1>
            <p className="font-light text-lg md:text-xl tracking-wider">{pageLang.hero.subtitle}</p>
            <div className="mt-8 flex flex-col items-center gap-4 w-full">
                <Button
                    onClick={() => dispatch({ type: "OPEN_MODAL", payload: { type: "LOGIN" } })}
                    leftIcon={<CgMail size={18} />}
                >
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
    );
};

export default Base;
