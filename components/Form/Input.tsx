import React, { FC, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Loading from "../Indicator/Loading";
import validator from "./utils/validator";

type Props = {
    type: string;
    name: string;
    label: string;
    setForm: Function;
    value: any;
    validity: any;
    setValidity: Function;
    options?: Array<any>;
    placeholder?: string;
    required?: boolean;
    validation?: any;
    fieldValues?: any;
};

const Input: FC<Props> = ({
    type,
    name,
    label,
    setForm,
    value,
    options,
    placeholder,
    required,
    validation,
    fieldValues,
    validity,
    setValidity,
}) => {
    const [visibility, setVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Array<string>>([]);

    useEffect(() => {
        console.log(label, message);

        if (message.length > 0) {
            setValidity({ ...validity, [name]: false });
        } else {
            setValidity({ ...validity, [name]: true });
        }

        //eslint-disable-next-line
    }, [message]);

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
                        onChange={async (e) => {
                            e.preventDefault();
                            setForm({ ...fieldValues, [name]: e.target.value });

                            (validation || required) &&
                                setMessage(
                                    await validator(
                                        validation,
                                        name,
                                        label,
                                        e.target.value,
                                        fieldValues,
                                        setLoading,
                                        required,
                                        "users"
                                    )
                                );
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
                                    onChange={async (e) => {
                                        let values = fieldValues[name];

                                        if (e.target.checked) values.push(opt.name);
                                        else values = values.filter((value: any) => opt.name !== value);

                                        setForm({ ...fieldValues, [name]: values });

                                        (validation || required) &&
                                            setMessage(
                                                await validator(
                                                    validation,
                                                    name,
                                                    label,
                                                    values,
                                                    fieldValues,
                                                    setLoading,
                                                    required,
                                                    "users"
                                                )
                                            );
                                    }}
                                />
                                <label htmlFor={opt.name}>{opt.label}</label>
                            </div>
                        );
                    })}
                    {message.length > 0 && (
                        <span className="w-full block text-red-500 text-left text-sm mt-2">{message[0]}</span>
                    )}
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
                                    onChange={async (e) => {
                                        setForm({ ...fieldValues, [name]: e.target.value });

                                        (validation || required) &&
                                            setMessage(
                                                await validator(
                                                    validation,
                                                    name,
                                                    label,
                                                    e.target.value,
                                                    fieldValues,
                                                    setLoading,
                                                    required,
                                                    "users"
                                                )
                                            );
                                    }}
                                />
                                <label htmlFor={opt}>{opt}</label>
                            </div>
                        );
                    })}
                    {message.length > 0 && (
                        <span className="w-full block text-red-500 text-left text-sm mt-2">{message[0]}</span>
                    )}
                </div>
            );

        case "password":
            return (
                <>
                    <div className="relative">
                        <label htmlFor={name} className="block text-left my-2">
                            {label}
                            {required && "*"}
                        </label>
                        <input
                            type={visibility ? "text" : "password"}
                            name={name}
                            className="rounded-sm w-full p-2 mb-2"
                            placeholder={placeholder}
                            value={value}
                            onChange={async (e) => {
                                e.preventDefault();
                                setForm({ ...fieldValues, [name]: e.target.value });
                                (validation || required) &&
                                    setMessage(
                                        await validator(
                                            validation,
                                            name,
                                            label,
                                            e.target.value,
                                            fieldValues,
                                            setLoading,
                                            required,
                                            "users"
                                        )
                                    );
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
                    {message.length > 0 && (
                        <span className="w-full block text-red-500 text-left text-sm mb-4">{message[0]}</span>
                    )}
                </>
            );

        default:
            return (
                <>
                    <div className="relative">
                        <label htmlFor={name} className="block text-left my-2">
                            {label}
                            {required && "*"}
                        </label>
                        <input
                            type={type}
                            name={name}
                            value={value}
                            className="rounded-sm w-full p-2 mb-2"
                            placeholder={placeholder}
                            onChange={async (e) => {
                                e.preventDefault();
                                setForm({ ...fieldValues, [name]: e.target.value });
                                (validation || required) &&
                                    setMessage(
                                        await validator(
                                            validation,
                                            name,
                                            label,
                                            e.target.value,
                                            fieldValues,
                                            setLoading,
                                            required,
                                            "users"
                                        )
                                    );
                            }}
                        />
                        {loading && (
                            <div className="absolute z-50 top-1/2 right-0 mr-3 opacity-50">
                                <Loading size={"md"} />
                            </div>
                        )}
                    </div>

                    {message.length > 0 && (
                        <span className="w-full block text-red-500 text-left text-sm mb-4">{message[0]}</span>
                    )}
                </>
            );
    }
};

export default Input;
