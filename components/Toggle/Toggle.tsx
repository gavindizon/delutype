import React, { FC, useEffect, useState } from "react";
import styles from "./Toggle.module.scss";

type Props = {
    isToggled: boolean;
    toggle: Function;
    toggleText: string;
    untoggleText: string;
    label: string;
    style?: Object;
};

const Toggle: FC<Props> = ({ label, isToggled, toggle, toggleText, untoggleText, style }) => {
    let [className, setClassName] = useState("");
    const [text, setText] = useState("");

    useEffect(() => {
        setClassName(isToggled ? styles["container"] : styles["container--toggled"]);
        setText(isToggled ? toggleText : untoggleText);
        //es-lint-disable-next-line
    }, [isToggled]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.target.setAttribute("data-value", !isToggled ? toggleText : untoggleText);
        toggle(!isToggled);
    };

    return (
        <label htmlFor={label} className={className} data-value={text} style={style || {}}>
            <input
                type="checkbox"
                onChange={handleChange}
                title={label}
                className={`inline-block`}
                style={style || {}}
            />
        </label>
    );
};

export default Toggle;
