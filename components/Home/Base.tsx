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
        <section className="flex justify-center">
            <div className="h-screen w-3/4 flex flex-col max-w-5xl space-y-20 justify-center items-center relative lg:flex-row lg:justify-between lg:w-5/6 lg:space-y-0">
                <div className="flex flex-col w-full space-y-8 items-center text-center lg:items-start lg:text-left lg:w-5/12 items-center">
                    <h1 className="font-extrabold text-7xl">
                        ty
                        <span>ph</span>e
                    </h1>
                    <p className="font-light text-lg tracking-normal">{pageLang.hero.subtitle}</p>
                    <Button href={"/about"}>{genLang["learn-more"]}</Button>
                </div>
                <div className="flex flex-col items-center w-full lg:w-5/12 mt-8 lg:items-end gap-4">
                    <Button
                        onClick={() => dispatch({ type: "OPEN_MODAL", payload: { type: "LOGIN" } })}
                        leftIcon={<CgMail size={18} />}
                        isFullWidth={true}
                    >
                        {genLang["sign-in-email"]}
                    </Button>
                    <Button onClick={() => {}} leftIcon={<FcGoogle size={18} />} isFullWidth={true}>
                        {genLang["sign-in-google"]}
                    </Button>
                    <Button href={"/sign-up"} leftIcon={<IoPersonCircleSharp size={18} />} isFullWidth={true}>
                        {genLang["create-an-account"]}
                    </Button>
                </div>
                {/* <button type="button" className="absolute bottom-10 flex flex-col font-thin items-center text-light">
                    {genLang["learn-more"]}
                    <span>
                        <FaChevronDown size={16} />
                    </span>
                </button> */}
            </div>
        </section>
    );
};

export default Base;
