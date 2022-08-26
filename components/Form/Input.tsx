import React, { FC, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

type Props = {
    type: string;
    name: string;
    label: string;
    onChange: Function;
    value: any;
    options?: Array<any>;
    placeholder?: string;
    required?: boolean;
};

const Input: FC<Props> = ({ type, name, label, onChange, value, options, placeholder, required }) => {
    const [visibility, setVisibility] = useState(false);
    switch (type) {
        case "select":
            return (
                <>
                    <label htmlFor={name} className="block text-left mb-2">
                        {label}
                        {required && "*"}
                    </label>
                    <select
                        title={name}
                        className="rounded-sm w-full p-2 mb-4 "
                        value={value}
                        onChange={(e) => {
                            e.preventDefault();
                            onChange(e);
                        }}
                    >
                        {options?.map((opt) => (
                            <option key={opt} value={opt}>
                                {opt}
                            </option>
                        ))}
                    </select>
                </>
            );

        case "checkbox":
            return (
                <div className="w-full mb-4">
                    <p className="text-left mb-1">{label}</p>
                    {options?.map((opt) => {
                        return (
                            <div key={opt.name} className="text-left">
                                <input
                                    type="checkbox"
                                    name={opt.name}
                                    title={opt.name}
                                    className="mr-2"
                                    onChange={(e) => {
                                        onChange({ value: opt.name, status: e.target.checked });
                                    }}
                                />
                                <label htmlFor={opt.name}>{opt.label}</label>
                            </div>
                        );
                    })}
                </div>
            );
        case "radio":
            return (
                <div className="w-full mb-4">
                    <p className="text-left mb-1">{label}</p>
                    {options?.map((opt) => {
                        return (
                            <div key={opt} className="text-left">
                                <input
                                    type="radio"
                                    name={name}
                                    title={name}
                                    value={opt}
                                    className="mr-2"
                                    onChange={(e) => {
                                        e.preventDefault();
                                        onChange(e);
                                    }}
                                />
                                <label htmlFor={opt}>{opt}</label>
                            </div>
                        );
                    })}
                </div>
            );

        case "password":
            return (
                <div className="relative">
                    <label htmlFor={name} className="block text-left mb-2">
                        {label}
                        {required && "*"}
                    </label>
                    <input
                        type={visibility ? "text" : "password"}
                        name={name}
                        className="rounded-sm w-full p-2 mb-4"
                        placeholder={placeholder}
                        value={value}
                        onChange={(e) => {
                            e.preventDefault();
                            onChange(e);
                        }}
                        required={required}
                    />
                    <button
                        className="absolute z-50 top-1/2 right-0 mr-3 opacity-50"
                        onClick={(e) => {
                            e.preventDefault();
                            setVisibility(!visibility);
                        }}
                    >
                        {visibility ? <FaEye size={"18"} /> : <FaEyeSlash size={"18"} />}
                    </button>
                </div>
            );

        default:
            return (
                <>
                    <label htmlFor={name} className="block text-left mb-2">
                        {label}
                        {required && "*"}
                    </label>
                    <input
                        type={type}
                        name={name}
                        value={value}
                        className="rounded-sm w-full p-2 mb-4"
                        placeholder={placeholder}
                        onChange={(e) => {
                            e.preventDefault();
                            onChange(e);
                        }}
                    />
                </>
            );
    }
};

export default Input;
