import React, { FC } from "react";
import Head from "next/head";
import Navigation from "./Navigation/Navigation";
import useDarkMode from "use-dark-mode";
import Toggle from "../Toggle/Toggle";
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
                <title>{title} | DELUType</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width" />
            </Head>
            <Navigation lang={lang} />
            <main className="mx-auto container">{children}</main>
            <div className="fixed bottom-10 right-10">
                <Toggle isToggled={value} toggle={toggle} toggleText="☾" untoggleText="☀" label="Mode" />
            </div>
        </>
    );
};

export default Layout;
