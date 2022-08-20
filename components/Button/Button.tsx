import React, { FC } from "react";
import Link from "next/link";
import Loading from "../Indicator/Loading";

type Props = {
    children: JSX.Element | string;
    href?: string;
    onClick?: Function;
    isFullWidth?: boolean;
    isDisabled?: boolean;
    leftIcon?: JSX.Element | string;
    rightIcon?: JSX.Element | string;
    className?: string;
    type?: "button" | "submit" | "reset";
    loading?: boolean;
    variant?: "solid" | "outline" | "danger";
};

const Button: FC<Props> = ({
    children,
    href,
    leftIcon,
    rightIcon,
    className = "",
    isFullWidth = false,
    isDisabled = false,
    onClick,
    type = "button",
    variant = "solid",
    loading = false,
}) => {
    className += ` rounded-md ${
        variant === "danger"
            ? "bg-red-600 border-2 border-red-600 transition hover:bg-red-800 hover:border-red-800 text-white"
            : `btn--${variant}`
    } uppercase py-2 ${isFullWidth ? "w-full" : "md:w-96 w-full"} ${
        isDisabled ? "opacity-90 cursor-not-allowed" : ""
    } flex items-center justify-center`;

    const content = (
        <>
            {leftIcon && <span className="inline-block mr-2">{leftIcon}</span>}
            {children}
            {rightIcon && <span className="inline-block ml-2">{rightIcon}</span>}
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
            disabled={isDisabled}
            className={className}
        >
            {loading ? <Loading size={"md"} /> : content}
        </button>
    );
};

export default Button;
