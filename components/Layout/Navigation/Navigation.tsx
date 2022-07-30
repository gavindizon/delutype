import React, { FC } from "react";
import Link from "next/link";
import sitemap from "../../../data/sitemap.json";
import { useRouter } from "next/router";

type Props = {
    lang: string;
};

const Navigation: FC<Props> = ({ lang }) => {
    const router = useRouter();

    return (
        <header className="fixed z-30 w-full h-12 top-0 flex items-center">
            <nav className="px-2 container m-auto flex justify-between items-center">
                <Link href={"/"}>
                    <a className="text-3xl">
                        <span className="font-bold">DELU</span>Type
                    </a>
                </Link>
                <div className="my-auto">
                    {sitemap.map((site) => (
                        <Link href={site.path} key={site.path}>
                            <a className="inline-block mx-4 font-light mt-2 uppercase">{site.title}</a>
                        </Link>
                    ))}

                    <div className="select-wrapper">
                        <select
                            name="langauge"
                            title="language"
                            value={lang}
                            className="ml-4 rounded-xl pl-2 pr-6 py-1 text-xs cursor-pointer"
                            onChange={(e) => {
                                router.push(`/?lang=${e.target.value}`, undefined, { shallow: true });
                                localStorage.setItem("lang", e.target.value);
                            }}
                        >
                            <option value="en">English</option>
                            <option value="fil">Tagalog</option>
                        </select>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Navigation;
