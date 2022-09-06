import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { animated, useSpring } from "@react-spring/web";

import { ImCross } from "react-icons/im";
import Content from "./Content";

type Props = {
    headerTitle?: string;
    containerClassName?: string;
};

const Modal: FC<Props> = ({ headerTitle, containerClassName }) => {
    const state = useSelector((state: any) => state);
    const dispatch = useDispatch();

    const [overlayStyle, overlayAPI] = useSpring(() => ({
        opacity: 0,
        display: "none",
    }));

    const [containerStyle, containerAPI] = useSpring(() => ({
        display: "none",
        transform: "translate(-50%, -25%)",
    }));

    useEffect(() => {
        if (state.modal?.isActive) {
            overlayAPI({ opacity: 1, display: "block" });
            containerAPI({ display: "block", transform: "translate(-50%, -50%)" });
        } else {
            overlayAPI({
                opacity: 0.2,
                display: "none",
            });
            containerAPI({ display: "none", transform: "translate(-50%, -25%)" });
        }

        //eslint-disable-next-line
    }, [state.modal?.isActive]);

    return (
        <>
            <animated.div style={overlayStyle} className={`full-overlay`}></animated.div>

            <animated.div
                style={containerStyle}
                className={`modal ${containerClassName} z-[999] absolute top-1/2 left-1/2 rounded-lg`}
            >
                <div className="relative">
                    <div className="absolute top-4 right-4">
                        <ImCross className="cursor-pointer" onClick={(e) => dispatch({ type: "CLOSE_MODAL" })} />
                    </div>
                    {headerTitle && <h2>{headerTitle}</h2>}
                    <div className="mx-auto px-4 h-full">
                        <Content type={state.modal?.type} />
                    </div>
                </div>
            </animated.div>
        </>
    );
};

export default Modal;
