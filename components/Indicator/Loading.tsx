import React, { FC } from "react";

type Props = {
    size: "sm" | "md" | "lg" | "xl" | "2xl";
};

const Loading: FC<Props> = ({ size = "md" }) => {
    const convertSize = {
        sm: "w-2 h-2",
        md: "w-5 h-5",
        lg: "w-8 h-8",
        xl: "w-12 h-12",
        "2xl": "w-24 h-24",
    };

    return (
        <svg className={`animate-spin ${convertSize[size]} my-1`} viewBox="0 0 24 24">
            <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                fillOpacity={0}
                stroke="currentColor"
                strokeWidth={4}
            ></circle>
            <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
        </svg>
    );
};

export default Loading;
