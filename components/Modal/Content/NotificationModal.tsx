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
  addOns?: any;
};

const NotificationModal: FC<Props> = ({
  name,
  description,
  redirectTo,
  redirectToLabel,
  addOns,
}) => {
  const dispatch = useDispatch();
  return (
    <>
      {console.log (addOns)}
      <div className="mx-auto py-4 px-4 h-full">
        <h1 className="text-center text-2xl pb-6">{name}</h1>
        <h1 className="text-center">{description}</h1>
        <div className="w-full flex justify-center py-4">
          {redirectToLabel && (
            <Button
              href={redirectTo}
              onClick={() => dispatch({ type: "CLOSE_MODAL" })}
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
