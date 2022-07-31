import React, { FC } from "react";
import Link from "next/link";

type Props = {
    children: JSX.Element | string;
    href?: string;
    onClick?: Function;
    leftIcon?: JSX.Element | string;
    className?: string;
    type?: "button" | "submit" | "reset";
};

const Button: FC<Props> = ({ children, href, leftIcon, className = "", onClick, type = "button" }) => {
    className += " rounded-md btn uppercase py-2 w-full md:w-96 flex items-center justify-center";

    const content = leftIcon && (
        <>
            <span className="inline-block mr-2">{leftIcon}</span>
            {children}
        </>
    );

    if (href)
        return (
            <Link href={href}>
                <a className={className}>{content}</a>
            </Link>
        );

    return (
        <button
            type={type}
            onClick={(e) => {
                onClick && onClick();
            }}
            className={className}
        >
            {content}
        </button>
    );
};

export default Button;
