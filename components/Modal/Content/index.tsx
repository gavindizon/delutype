import React, { FC, useEffect } from "react";
import Login from "./Login";

type Props = {
    type: String;
};

const Content: FC<Props> = ({ type }) => {
    switch (type.toUpperCase()) {
        case "NOTIFICATION":
        //            return <NotificationModal name={} description={}/>
        case "LOGIN":
        default:
            return <Login />;
    }
};

export default Content;
