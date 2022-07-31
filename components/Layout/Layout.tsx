import React, { FC, useState } from "react";
import Head from "next/head";
import Navigation from "./Navigation/Navigation";
import useDarkMode from "use-dark-mode";
import Toggle from "../Toggle/Toggle";
import Modal from "../Modal/Modal";
import { AnyAction, CombinedState, Dispatch } from "redux";
import { closeModal } from "../../redux/actions/modal";
import { useSelector } from "react-redux";
import { EnhancedStore } from "@reduxjs/toolkit";

type Props = {
    children: React.ReactNode;
    title: string;
    description?: string;
    lang: string;
    dispatch: Dispatch<AnyAction>;
    state: CombinedState<any>;
};

const Layout: FC<Props> = ({ children, title, description, lang, state, dispatch }) => {
    const { value, toggle } = useDarkMode(false);
    return (
        <>
            <Head>
                <title>{title} | DELUType</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navigation lang={lang} />
            <main className="mx-auto container">{children}</main>
            <Modal
                status={state.modal.isActive}
                toggler={() => {
                    dispatch({ type: "CLOSE_MODAL" });
                }}
                containerClassName={"w-full h-full md:h-[320px] md:w-[480px]"}
            >
                <div className="flex h-full flex-col justify-center items-center">
                    <h1 className="text-center text-4xl mb-4">
                        <span className="font-bold">DELU</span>Type
                    </h1>
                    <label htmlFor="email" className="w-full mb-2">
                        Email:
                    </label>
                    <input type="text" placeholder="janedelacruz@delutype.com" className="w-full p-2 mb-4" />
                </div>
            </Modal>
            <div className="fixed bottom-10 right-10 z-50">
                <Toggle isToggled={value} toggle={toggle} toggleText="☾" untoggleText="☀" label="Mode" />
            </div>
        </>
    );
};

export default Layout;
