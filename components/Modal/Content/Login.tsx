import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { FcGoogle } from "react-icons/fc";
import { CgMail } from "react-icons/cg";
import { IoPersonCircleSharp } from "react-icons/io5";

import Button from "../../../components/Button/Button";
import Input from "../../../components/Form/Input";

import general from "../../../data/general.json";
import useLanguage from "../../../hooks/useLanguage";
import useAuth from "../../../hooks/useAuth";
import { useRouter } from "next/router";

import form from "../../../data/signin.json";
import {
    initializeFieldValues,
    initializeValidatorValues,
} from "../../../components/Form/utils/initializeFieldValues";

interface LoginModel {
    email: string;
    password: string;
}

const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const { loginWithGoogle, login, setIsLoggingIn, setUser, setProvider } =
        useAuth();

    const [sendLoginForm, setSendLoginForm] = useState(
        initializeFieldValues(form, false)
    );
    const [validity, setValidity] = useState(
        initializeValidatorValues(form, false)
    );

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ status: false, message: "" });

    const lang = useLanguage();
    const genLang = general[lang as keyof typeof general];

    const handleLogin = async ({ email, password }: LoginModel) => {
        try {
            setError({ status: false, message: "" });
            setLoading(true);
            if (email.trim() === "" || password === "")
                throw new Error("Error: Please input your email and password");
            const response: any = await login(
                email,
                password,
                setIsLoggingIn,
                dispatch,
                setUser,
                setProvider
            );
            setSendLoginForm(initializeFieldValues(form, false));

            if (response?.type === "error") throw new Error(response?.message);
            router.push("/");
        } catch (e: any) {
            setError({ status: true, message: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full flex-col justify-center items-center">
            <h1 className="font-extrabold text-center text-4xl mt-16 mb-4">
                ty<span>ph</span>e
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(sendLoginForm);
                }}
                className="flex flex-col w-11/12 items-center"
            >
                {form.map((field: any) => (
                    <Input
                        key={field.name}
                        {...field}
                        validity={validity}
                        setValidity={setValidity}
                        fieldValues={sendLoginForm}
                        setForm={setSendLoginForm}
                        value={sendLoginForm[field.name]}
                    />
                ))}
                {error?.status && (
                    <div className="w-full bg-red-500 rounded-sm p-2 mt-6">
                        <p className="text-left text-sm mb-2 text-black ">
                            {error.message}
                        </p>
                    </div>
                )}
                <Link href="/forgot-password">
                    <a
                        className="text-sm font-light text-left w-full mt-4"
                        onClick={(e) => {
                            e.preventDefault();
                            dispatch({ type: "CLOSE_MODAL" });
                            router.push("/forgot-password", undefined, {
                                shallow: true,
                            });
                        }}
                        tabIndex={-1}
                    >
                        {genLang["forgot-password"]}
                    </a>
                </Link>
                <Button
                    type="submit"
                    isFullWidth
                    isDisabled={
                        sendLoginForm.email === "" ||
                        sendLoginForm.password === ""
                    }
                    className="mt-8"
                    loading={loading}
                    leftIcon={<CgMail size={18} />}
                >
                    {genLang["sign-in-email"]}
                </Button>
            </form>

            <div className="divider my-4">
                <h6 className="text-sm">{genLang["or"]}</h6>
            </div>

            <div className="flex flex-col items-center mb-8 gap-2 w-11/12">
                <Button
                    isFullWidth
                    onClick={() => {
                        dispatch({
                            type: "OPEN_MODAL",
                            payload: {
                                type: "NOTIFICATION",
                                title: genLang["your-consent"],
                                description: genLang["privacy-google"],
                                insertDescriptionAsHTML: true,
                                redirectTo: "/",
                                redirectToLabel: genLang["i-agree"],
                                redirectAction: () => {
                                    loginWithGoogle(lang);
                                },
                                addOns: {
                                    backTo: "/",
                                    backToLabel: genLang["go-back"],
                                },
                            },
                        });
                    }}
                    leftIcon={<FcGoogle size={18} />}
                >
                    {genLang["sign-in-google"]}
                </Button>
                <Button
                    isFullWidth
                    href={"/sign-up"}
                    onClick={() => dispatch({ type: "CLOSE_MODAL" })}
                    className="mt-2 mb-8"
                    leftIcon={<IoPersonCircleSharp size={18} />}
                >
                    {genLang["create-an-account"]}
                </Button>
            </div>
        </div>
    );
};

export default Login;
