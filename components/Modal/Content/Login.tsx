import React, { useState } from "react";
import Button from "../../../components/Button/Button";

import { FaChevronDown } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import { CgMail } from "react-icons/cg";
import general from "../../../data/general.json";
import useLanguage from "../../../hooks/useLanguage";
import { IoPersonCircleSharp } from "react-icons/io5";

import useAuth from "../../../hooks/useAuth";
import { useDispatch } from "react-redux";

interface LoginModel {
    email: string;
    password: string;
}

const Login = () => {
    const dispatch = useDispatch();

    const auth = useAuth();
    const [loginForm, setLoginForm] = useState<LoginModel>({
        email: "gavinrainedizon@gmail.com",
        password: "SlowDancingInTheDark",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({ status: false, message: "" });

    const lang = useLanguage();
    const genLang = general[lang as keyof typeof general];

    const handleLogin = async ({ email, password }: LoginModel) => {
        try {
            setError({ status: false, message: "" });
            setLoading(true);
            if (email.trim() === "" || password === "") throw new Error("Error: Please input your email and password");
            const response: any = await auth.login(email, password);
            if (response?.type === "error") throw new Error(response?.message);
        } catch (e: any) {
            setError({ status: true, message: e.message });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex h-full flex-col justify-center items-center">
            <h1 className="text-center text-4xl mt-16 mb-4">
                ty
                <span>ph</span>e
            </h1>
            <form
                onSubmit={(e) => {
                    e.preventDefault();
                    handleLogin(loginForm);
                }}
            >
                <label htmlFor="email" className="w-full text-sm mb-2">
                    Email:
                </label>
                <input
                    type="text"
                    placeholder="janedelacruz@typhe.io"
                    className="w-full p-2 mb-4"
                    onChange={(e) => {
                        setError({ status: false, message: "" });
                        setLoginForm({ ...loginForm, email: e.target.value });
                    }}
                    value={loginForm.email}
                />
                <label htmlFor="password" className="w-full text-sm mb-2">
                    Password:
                </label>
                <input
                    type="password"
                    placeholder="*******"
                    className="w-full p-2 mb-2"
                    onChange={(e) => {
                        setError({ status: false, message: "" });
                        setLoginForm({ ...loginForm, password: e.target.value });
                    }}
                    value={loginForm.password}
                />
                {error?.status && (
                    <div className="w-full bg-red-500/70 border border-red-900 rounded-sm p-2">
                        <p className="text-left text-sm mb-2 text-red-900/100 ">{error.message}</p>
                    </div>
                )}
                <Button
                    type="submit"
                    isFullWidth
                    isDisabled={loginForm.email.trim() === "" || loginForm.password === ""}
                    className="mt-4"
                    loading={loading}
                    leftIcon={<CgMail size={18} />}
                >
                    {genLang["sign-in-email"]}
                </Button>
            </form>

            <div className="divider my-4">
                <h6 className="text-sm">or</h6>
            </div>
            <Button isFullWidth href={"/sign-in"} leftIcon={<FcGoogle size={18} />}>
                {genLang["sign-in-google"]}
            </Button>
            <Button isFullWidth href={"/sign-up"} className="mt-2 mb-8" leftIcon={<IoPersonCircleSharp size={18} />}>
                {genLang["create-an-account"]}
            </Button>
        </div>
    );
};

export default Login;
