import React, { FC, useEffect, useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import useLanguage from "../../hooks/useLanguage";
import Loading from "../Indicator/Loading";
import validator from "./utils/validator";
import labelLang from "../../data/field-labels.json"


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
    disabled?: boolean;
    validation?: any;
    fieldValues?: any;
    insertAsHTML?: boolean;
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
    insertAsHTML = false,
    disabled = false,
}) => {
    const [visibility, setVisibility] = useState(false);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<Array<string>>([]);

    const lang = useLanguage();
    const fieldLabel: any = labelLang[lang as keyof typeof labelLang];

    useEffect(() => {
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
                    <label htmlFor={name} className="font-medium text-lg text-left mt-4 mb-2 block">
                        {fieldLabel[label]}
                        {!required && " *"}
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
                                        lang,
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
                <div className="w-full mb-4 font-light">
                    <p className="font-medium text-lg text-left mt-4 mb-2 block">
                        {fieldLabel[label]}
                        {!required && " *"}
                    </p>
                    {options?.map((opt) => {
                        return (
                            <div key={opt.name} className="text-left">
                                <input
                                    type="checkbox"
                                    name={opt.name}
                                    title={opt.name}
                                    disabled={disabled}
                                    checked={fieldValues[name].includes(opt.name)}
                                    className="my-2 mx-4"
                                    onChange={async (e) => {
                                        let values = fieldValues[name];

                                        if (e.target.checked) values.push(opt.name);
                                        else values = values.filter((value: any) => opt.name !== value);

                                        setForm({ ...fieldValues, [name]: values });

                                        (validation || required) &&
                                            setMessage(
                                                await validator(
                                                    lang,
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
                                {!insertAsHTML ? (
                                    <label htmlFor={opt.name} className="">{fieldLabel[opt.label]}</label>
                                ) : (
                                    <label htmlFor={opt.name} className="font-light italic" dangerouslySetInnerHTML={{ __html: fieldLabel[opt.label] }}></label>
                                )}
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
                <div className="w-full mb-4 font-light">
                    <p className="font-medium text-lg text-left mt-4 mb-2 block">
                        {fieldLabel[label]}
                        {!required && " *"}
                    </p>
                    {options?.map((opt) => {
                        return (
                            <div key={opt} className="text-left">
                                <input
                                    type="radio"
                                    name={name}
                                    title={name}
                                    value={opt}
                                    checked={fieldValues[name] === opt}
                                    disabled={disabled}
                                    className="my-2 mx-4"
                                    onChange={async (e) => {
                                        setForm({ ...fieldValues, [name]: e.target.value });

                                        (validation || required) &&
                                            setMessage(
                                                await validator(
                                                    lang,
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
                                <label htmlFor={opt} className="">{fieldLabel[opt]}</label>
                            </div>
                        );
                    })}
                    {message.length > 0 && (
                        <span className="w-full block text-red-500 text-left text-sm my-2">{message[0]}</span>
                    )}
                </div>
            );

        case "password":
            return (
                <>
                    <div className="relative w-full">
                        <label htmlFor={name} className="font-medium text-lg text-left mt-4 mb-2 block">
                            {fieldLabel[label]}
                            {!required && " *"}
                        </label>
                        <input
                            type={visibility ? "text" : "password"}
                            name={name}
                            className="rounded-md w-full px-4 py-3"
                            placeholder={placeholder}
                            value={value}
                            onChange={async (e) => {
                                e.preventDefault();
                                setForm({ ...fieldValues, [name]: e.target.value });
                                (validation || required) &&
                                    setMessage(
                                        await validator(
                                            lang,
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
                            className="absolute z-3 right-0 mr-4 mt-4 opacity-50"
                            onClick={(e) => {
                                e.preventDefault();
                                setVisibility(!visibility);
                            }}
                            tabIndex={-1}
                        >
                            {visibility ? <FaEye size={"18"} /> : <FaEyeSlash size={"18"} />}
                        </button>
                    </div>
                    {message.length > 0 && (
                        <span className="w-full block text-red-500 text-left text-sm my-2">{message[0]}</span>
                    )}
                </>
            );

        default:
            if (type === "date" && typeof value?.toDate === "function")
                value = new Intl.DateTimeFormat("en-CA").format(value.toDate());
            return (
                <>
                    <div className="relative w-full">
                        <label htmlFor={name} className="font-medium text-lg text-left mt-4 mb-2 block">
                            {fieldLabel[label]}
                            {!required && " *"}
                        </label>
                        <input
                            type={type}
                            name={name}
                            value={value}
                            disabled={disabled}
                            className={`rounded-md w-full px-4 py-3 disabled:cursor-not-allowed`}
                            placeholder={placeholder}
                            onChange={async (e) => {
                                e.preventDefault();
                                setForm({
                                    ...fieldValues,
                                    [name]: e.target.value,
                                });
                                (validation || required) &&
                                    setMessage(
                                        await validator(
                                            lang,
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
                        <span className="w-full block text-red-500 text-left text-sm my-2">{message[0]}</span>
                    )}
                </>
            );
    }
};

export default Input;
