import React, { FC, useEffect, useState } from "react";
import styles from "./Toggle.module.scss";

type Props = {
    isToggled: boolean;
    toggle: Function;
    toggleText: string;
    untoggleText: string;
    label: string;
};

const Toggle: FC<Props> = ({ label, isToggled, toggle, toggleText, untoggleText }) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.setAttribute("data-value", !isToggled ? toggleText : untoggleText);
        toggle(!isToggled);
    };

    console.log(styles["container--toggled"]);
    return (
        <label
            htmlFor={label}
            className={`${isToggled ? styles["container"] : styles["container--toggled"]}`}
            data-value={isToggled ? toggleText : untoggleText}
        >
            <input type="checkbox" onChange={handleChange} title={label} className={`inline-block`} />
        </label>
    );
};

export default Toggle;
