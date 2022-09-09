import type { NextPage } from "next";
import { useSelector, useDispatch } from "react-redux";
import React from "react";

import Layout from "./../components/Layout/Layout";
import general from "./../data/general.json";
import useLanguage from "./../hooks/useLanguage";
import Link from "next/link";
import Image from "next/image";
const Profile: NextPage = () => {
    const lang = useLanguage();
    const genLang = general[lang as keyof typeof general];
    let data = [];

    return (
        <Layout title="404 Not Found" description="" lang={lang}>
            <section className="h-screen px-2 text-center flex flex-col -mt-6 justify-center items-center relative">
                <div className="relative w-4/5 md:w-3/5 h-1/3 mb-4">
                    <Image
                        src={"/images/404.svg"}
                        alt="404"
                        objectFit="contain"
                        objectPosition={"center"}
                        layout="fill"
                    />
                </div>

                <h1 className="text-4xl font-bold mb-2">404 : Page Not Found</h1>
                <p className="tracking-wide font-light text-2xl">
                    Please check the URL. No page exists with the given url.
                    <br /> Please go back to the{" "}
                    <Link href="/">
                        <a className="underline">homepage</a>
                    </Link>
                    .
                </p>
            </section>
        </Layout>
    );
};

export default Profile;
