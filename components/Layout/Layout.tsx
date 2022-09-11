import React, { FC, useState } from "react";
import Head from "next/head";
import Navigation from "./Navigation/Navigation";
import Footer from "./Footer/Footer";
import useDarkMode from "@fisch0920/use-dark-mode";
import Toggle from "../Toggle/Toggle";
import Modal from "../Modal/Modal";
import { AnyAction, CombinedState, Dispatch } from "redux";
import { GetServerSideProps } from "next";
import axios from "axios";
import AuthGuard from "../Auth/AuthGuard";

type Props = {
    children: React.ReactNode;
    title: string;
    description?: string;
    lang: string;
};

const Layout: FC<Props> = ({ children, title, description, lang }) => {
    const { value, toggle } = useDarkMode(false);
    return (
        <>
            <Head>
                <title>{title} | typhe</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navigation lang={lang} />
            <main className="mx-auto container">
                <AuthGuard>{children}</AuthGuard>
            </main>
            <Modal containerClassName={"w-full h-full md:h-auto md:w-[480px]"} />
            <div className="fixed bottom-10 right-10 z-50">
                <Toggle isToggled={value} toggle={toggle} toggleText="☾" untoggleText="☀" label="Mode" />
            </div>
            {title !== "Test" || "Calibration"
            ? <Footer />
            : null}
        </>
    );
};

export default Layout;
