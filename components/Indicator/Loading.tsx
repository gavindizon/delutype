import React, { FC } from "react";

type Props = {
    size: "sm" | "md" | "lg" | "xl" | "2xl";
};

const Loading: FC<Props> = ({ size = "md" }) => {
    const convertSize = {
        sm: 2,
        md: 5,
        lg: 8,
        xl: 12,
        "2xl": 24,
    };

    return (
        <svg className={`animate-spin h-${convertSize[size]} w-${convertSize[size]} my-1`} viewBox="0 0 24 24">
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
