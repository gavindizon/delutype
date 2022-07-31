import React, { FC, useEffect } from "react";
import { ImCross } from "react-icons/im";

type Props = {
    headerTitle?: string;
    children?: React.ReactNode;
    toggler: Function;
    status: boolean;
    containerClassName?: string;
};

const Modal: FC<Props> = ({ children, status, toggler, headerTitle, containerClassName }) => {
    return (
        <div
            className={`full-overlay transition opacity-0 flex justify-center items-center ${
                !status ? "hidden" : "opacity-100"
            } `}
        >
            <div
                className={`modal ${containerClassName} rounded-sm relative transition-transform  -translate-y-0 ${
                    status && "md:-translate-y-4"
                }`}
            >
                <div className="absolute top-4 right-4">
                    <ImCross className="cursor-pointer" onClick={(e) => toggler()} />
                </div>
                {headerTitle && <h2>{headerTitle}</h2>}
                <div className="mx-auto px-4 h-full">{children}</div>
            </div>
        </div>
    );
};

export default Modal;
