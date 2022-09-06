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
    isFullWidth,
    isDisabled = false,
    onClick,
    type = "button",
    variant = "solid",
    loading = false,
}) => {
    className += ` font-bold py-3 flex items-center justify-center
        ${ variant === "danger" 
            ? "bg-red-600 border-2 border-red-600 transition hover:bg-red-800 hover:border-red-800 text-white"
            : `btn--${variant}`
        } 
        ${ isFullWidth
            ? "w-full" 
            : "px-6"
        }
        ${ isDisabled 
            ? "opacity-90 cursor-not-allowed" 
            : ""
        } rounded-md `;

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
                <a
                    className={className}
                    onClick={(e) => {
                        onClick && onClick();
                    }}
                >
                    {content}
                </a>
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
