import React, { FC, useEffect } from "react";
import Login from "./Login";
import NotificationModal from "./NotificationModal";
import { useSelector, useDispatch } from "react-redux";
import { animated, useSpring } from "@react-spring/web";

import { ImCross } from "react-icons/im";

type Props = {
    type: String;
};

const Content: FC<Props> = ({ type }) => {
    const state = useSelector((state: any) => state);
    switch (type.toUpperCase()) {
        case "NOTIFICATION":
          
            return <NotificationModal name={state.modal.title} description={state.modal.description} redirectTo={state.modal.redirectTo} redirectToLabel={state.modal.redirectToLabel}/>
        case "LOGIN":
        default:
            return <Login/>;
    }
};

export default Content;
