import styles from "./NavItem.module.scss";
import Link from "next/link";
import Layout from "../../Layout";
const NavItemMobile = ({ active, name, link }) => {
  return (
      <li className=" relative">
          <Link href={link}>
              <a className={`relative ${active ? "active" : ""} block px-2 mx-4 py-4 green ${"itemMobile"}`}>{name}</a>
          </Link>
      </li>
  );
};

export default NavItemMobile;

