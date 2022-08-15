import React, { FC } from "react";
import Link from "next/link";

type Props = {
    onClick?: Function;
    className?: string;
    type?: "button" | "submit" | "reset";
};

const CalibrationButton: FC<Props> = ({ className = "", onClick, type = "button" }) => {
    className += "w-5 h-5 rounded-full bg-red-300 border-black";



    return (
        <button
            
            onClick={(e) => {
                onClick && onClick();
            }}
            className={className}
        >
        &nbsp;    
        </button>
    );
};

export default CalibrationButton;
