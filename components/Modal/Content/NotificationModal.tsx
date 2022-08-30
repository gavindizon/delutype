import React, { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { animated, useSpring } from "@react-spring/web";

import { ImCross } from "react-icons/im";
import Content from "../Content";
import Link from "next/link";
import Button from "../../Button/Button";
type Props = {
    name?: string;
    description?: string;
    redirectTo?: string;
    redirectToLabel?: string;

};

const NotificationModal: FC<Props> = ({ name, description, redirectTo, redirectToLabel}) => {
  

    return (
        <>

                    <div className="mx-auto py-4 px-4 h-full">
                        <h1 className="text-center text-2xl pb-6">{name}</h1>
                        <h1 className="px-4 pb-2">{description}</h1>

                        <div className= "w-full flex justify-center py-4">{redirectToLabel && <Button href={redirectTo} className="">{redirectToLabel}</Button>}</div>
                        
                        
                    </div>
                
          
        </>
    );
};

export default NotificationModal;
