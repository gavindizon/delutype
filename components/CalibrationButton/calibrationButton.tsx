import React, { FC, useState } from "react";
import Link from "next/link";
import { BsReception1 } from "react-icons/bs";

type Props = {
    onClick?: Function;
    className?: string;
    id?: string;
    clicks?: number;
    hide?: boolean;
    type?: "button" | "submit" | "reset";
    setRemaining: Function;
};

const CalibrationButton: FC<Props> = ({
    className = "",
    id = "",
    clicks = 0,
    hide = false,
    onClick,
    type = "button",
    setRemaining,
}) => {
    className += "w-5 h-5 rounded-full bg-green-300 ";

    const [count, setCount] = useState(0.4);
    const [isFinished, setisFinished] = useState(false);

    return (
        <button
            title="calibration"
            onClick={(e) => {
                setCount((count) => count + 0.2);

                if (count + 0.2 === 1.4) {
                    setisFinished(true);
                    setRemaining((remaining: number) => remaining - 1);
                }
            }}
            className={`w-5 h-5 rounded-full ${
                hide ? "hidden" : ""
            }`}
            style={{
                opacity: count,
                backgroundColor: isFinished  ? "red" : "green"
            }}
            id={id}
        >
            &nbsp;
        </button>
    );
};

export default CalibrationButton;
