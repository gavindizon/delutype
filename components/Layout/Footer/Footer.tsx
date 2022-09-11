import React, { FC, useEffect, useState } from "react";

import Link from "next/link";
import sitemap from "../../../data/sitemap.json";
import { useRouter } from "next/router";
import useAuth from "../../../hooks/useAuth";

type Props = {
    lang: string;
    active?: any;
};

const Footer = () => {
    return (
        <footer className="flex items-center justify-center">
            <div className="w-full py-20 flex flex-col justify-between items-center space-y-8 max-w-5xl">
                <h1 className="font-extrabold text-4xl">
                    ty<span>ph</span>e
                </h1>
                <div className="font-semibold flex flex-col items-center space-y-8 sm:flex-row sm:space-y-0 sm:space-x-8">
                    {sitemap.map((site) => (
                        <Link href={site.path} key={site.path}>
                            <a>
                                {site.title}
                            </a>
                        </Link>
                    ))}
                    <Link href={"/privacy-policy"} key={"/privacy-policy"}>
                        <a>
                            Privacy Policy
                        </a>
                    </Link>
                </div>
                    <p className="font-light opacity-40">© 2022 typhe</p>
            </div>
        </footer>
    );
};

export default Footer;
