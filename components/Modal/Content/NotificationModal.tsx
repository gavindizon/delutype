import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { animated, useSpring } from "@react-spring/web";

import { ImCross } from "react-icons/im";
import Content from "../Content";
import Link from "next/link";
import Button from "../../Button/Button";
type Props = {
    name?: string;
    description?: string | any;
    redirectTo?: string;
    redirectAction?: Function;
    redirectToLabel?: string;
    addOns?: any;
    insertDescriptionAsHTML?: boolean;
};

const NotificationModal: FC<Props> = ({
    name,
    description,
    redirectTo,
    redirectToLabel,
    addOns,
    redirectAction,
    insertDescriptionAsHTML = false,
}) => {
    const dispatch = useDispatch();
    return (
        <>
            <div className="flex h-full flex-col justify-center items-center">
                <h1 className="font-bold text-center text-3xl mt-16 mb-8">{name}</h1>
                {!insertDescriptionAsHTML ? (
                    <p className="text-center w-5/6 mb-8">{description}</p>
                ) : (
                    <div dangerouslySetInnerHTML={{ __html: description }} className="w-5/6 mb-8"></div>
                )}
                <div className="w-full flex justify-center mb-12">
                    {redirectToLabel && (
                        <Button
                            href={redirectAction ? undefined : redirectTo}
                            onClick={() => {
                                redirectAction && redirectAction();
                                dispatch({ type: "CLOSE_MODAL" });
                            }}
                        >
                            {redirectToLabel}
                        </Button>
                    )}
                    {addOns?.backTo && addOns?.backToLabel && (
                        <Button
                            variant="outline"
                            className="ml-4"
                            href={addOns?.backTo}
                            onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                        >
                            {addOns?.backToLabel}
                        </Button>
                    )}
                </div>
            </div>
        </>
    );
};

export default NotificationModal;
