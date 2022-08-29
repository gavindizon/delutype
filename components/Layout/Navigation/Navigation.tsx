import React, { FC, useEffect, useState } from "react";
import Link from "next/link";
import sitemap from "../../../data/sitemap.json";
import { useRouter } from "next/router";
import useAuth from "../../../hooks/useAuth";
import { IoPersonCircleSharp } from "react-icons/io5";
import styles from "./navigation.module.scss";
type Props = {
    lang: string;
};

const Navigation: FC<Props> = ({ lang }) => {
    const [scrollTop, setScrollTop] = useState(0);

    const router = useRouter();
    const { user, logout } = useAuth();

    useEffect(() => {
        const onScroll = (e: any) => {
            setScrollTop(e.target.documentElement.scrollTop);
        };
        window.addEventListener("scroll", onScroll);

        return () => window.removeEventListener("scroll", onScroll);
    }, [scrollTop]);

    return (
        <header
            className="fixed z-30 w-full h-24 top-0 flex items-center"
            style={{
                transition: `box-shadow .4s`,
                boxShadow: `${
                    scrollTop > 100 ? "0px 18px 45px -20px rgba(0, 0, 0, 0.3)" : "0px 18px 45px -20px rgba(0, 0, 0, 0)"
                }`,
            }}
        >
            <nav className="px-2 container m-auto flex justify-between items-center">
                <Link href={"/"}>
                    <a className="text-3xl">
                        ty
                        <span>ph</span>e
                    </a>
                </Link>
                {user ? (
                    <div className={`relative ${styles["navProfile"]}`}>
                        <div className="flex flex-row items-center my-4 ">
                            <div className="mr-2">{user.photoUrl ? <></> : <IoPersonCircleSharp size={32} />}</div>

                            <Link href="/profile">
                                <a className={styles["navUserInfo"]}>
                                    {user.displayName || user.email.split("@")[0]}{" "}
                                    <span className="ml-2 text-xs">&#9660;</span>
                                </a>
                            </Link>
                            <div
                                className={`hidden w-4/5 shadow-xl rounded-sm  absolute top-0 right-0 mt-14 card ${styles["navDropdown"]}`}
                            >
                                <Link href="/">
                                    <a className="px-2 py-1 block">Home</a>
                                </Link>
                                <Link href="/profile">
                                    <a className="px-2 py-1 block">Profile</a>
                                </Link>
                                <button
                                    onClick={(e) => {
                                        logout(router);
                                    }}
                                    type="button"
                                    className="text-left w-full px-2 py-1 block"
                                >
                                    Sign out
                                </button>
                            </div>
                        </div>
                    </div>
                ) : (
                    <div className="my-4">
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
                                className="language-selector ml-4 rounded-xl pl-2 pr-6 py-1 text-xs cursor-pointer"
                                onChange={(e) => {
                                    router.push(`?lang=${e.target.value}`, undefined, { shallow: true });
                                    localStorage.setItem("lang", e.target.value);
                                }}
                            >
                                <option value="en">English</option>
                                <option value="fil">Tagalog</option>
                            </select>
                        </div>
                    </div>
                )}
            </nav>
        </header>
    );
};

export default Navigation;
