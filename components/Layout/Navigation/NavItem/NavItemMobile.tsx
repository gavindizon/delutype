import Link from "next/link";
import { FC } from "react";
type Props = {
    active: boolean;
    name: string;
    link: string;
};

const NavItemMobile: FC<Props> = ({ active, name, link }) => {
    return (
        <li className=" relative">
            <Link href={link}>
                <a className={`relative ${active ? "active" : ""} block px-2 mx-4 py-4 green ${"itemMobile"}`}>
                    {name}
                </a>
            </Link>
        </li>
    );
};

export default NavItemMobile;
