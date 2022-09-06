import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useDispatch } from "react-redux";

import Loading from "../Indicator/Loading";
import Button from "../Button/Button";
import Input from "../Form/Input";

import form from "../../data/resetpassword.json";
import { initializeFieldValues, initializeValidatorValues } from "../Form/utils/initializeFieldValues";
import validateForm from "../Form/utils/validateForm";
import handleResetPasswordSubmit from "../Form/utils/handleResetPasswordSubmit";
import useAuth from "../../hooks/useAuth";

type Props = {
    mode: string;
    status: string;
    setStatus: Function;
    code: string;
};

const AuthMode: FC<Props> = ({ mode, status = "", setStatus, code }) => {
    const { resetPassword } = useAuth();

    const dispatch = useDispatch();
    const [resetPasswordForm, setResetPasswordForm] = useState(initializeFieldValues(form, false));
    const [validity, setValidity] = useState(initializeValidatorValues(form, false));
    const [loading, setLoading] = useState(false);

    switch (mode) {
        case "verifyEmail":
            if (status)
                return (
                    <>
                        <div className="relative w-4/5 md:w-3/5 h-1/3 mb-4">
                            <Image
                                src={`/images/${status === "success" ? "verified" : "denied"}.svg`}
                                alt="404"
                                objectFit="contain"
                                objectPosition={"center"}
                                layout="fill"
                            />
                        </div>

                        <h1 className="text-4xl font-bold mb-2">
                            {status === "success" ? "Email successfully verified" : "Something went wrong"}
                        </h1>
                        <p className="tracking-wide font-light text-2xl">
                            {status === "success" ? (
                                // SUCCESS
                                <>
                                    You may now login{" "}
                                    <button
                                        className="underline"
                                        onClick={(e) => {
                                            dispatch({ type: "OPEN_MODAL", payload: { type: "LOGIN" } });
                                        }}
                                    >
                                        here
                                    </button>
                                    .
                                </>
                            ) : (
                                // FAIL
                                <>
                                    There seems to be an issue while verifying your email. Please email us{" "}
                                    <a className="underline" href="mailto:gavin_dizon@dlsu.edu.ph">
                                        here
                                    </a>
                                    .
                                </>
                            )}
                        </p>
                    </>
                );
        case "resetPassword":
            switch (status) {
                case "success":
                case "fail":
                    return (
                        <>
                            <div className="relative w-4/5 md:w-3/5 h-1/3 mb-4">
                                <Image
                                    src={`/images/${status === "success" ? "verified" : "denied"}.svg`}
                                    alt="404"
                                    objectFit="contain"
                                    objectPosition={"center"}
                                    layout="fill"
                                />
                            </div>

                            <h1 className="text-4xl font-bold mb-2">
                                {status === "success" ? "Password successfully changed" : "Something went wrong"}
                            </h1>
                            <p className="tracking-wide font-light text-2xl">
                                {status === "success" ? (
                                    // SUCCESS
                                    <>
                                        You may now login{" "}
                                        <button
                                            className="underline"
                                            onClick={(e) => {
                                                dispatch({ type: "OPEN_MODAL", payload: { type: "LOGIN" } });
                                            }}
                                        >
                                            here
                                        </button>
                                        .
                                    </>
                                ) : (
                                    // FAIL
                                    <>
                                        There seems to be an issue while resetting your password. Please email us{" "}
                                        <a className="underline" href="mailto:gavin_dizon@dlsu.edu.ph">
                                            here
                                        </a>
                                        .
                                    </>
                                )}
                            </p>
                        </>
                    );
                default: // FORM
                    return (
                        <div className="w-full flex flex-col justify-center items-center">
                            <h2 className="text-4xl font-semibold mb-4">Reset Password</h2>
                            <p className="tracking-wide text-lg mb-8 ">Reset Password</p>
                            <form
                                className="w-full md:w-[640px] mb-32"
                                onSubmit={async (e) => {
                                    try {
                                        e.preventDefault();
                                        let result = await handleResetPasswordSubmit(
                                            resetPasswordForm,
                                            code,
                                            resetPassword,
                                            setLoading
                                        );
                                        setStatus(result.status);
                                    } catch (err) {
                                        setStatus("failed");
                                    }
                                }}
                            >
                                {form.map((field) => {
                                    return (
                                        <Input
                                            key={field.name}
                                            {...field}
                                            validity={validity}
                                            setValidity={setValidity}
                                            fieldValues={resetPasswordForm}
                                            setForm={setResetPasswordForm}
                                            value={resetPasswordForm[field.name]}
                                        />
                                    );
                                })}
                                <Button
                                    type="submit"
                                    isDisabled={!validateForm(validity)}
                                    isFullWidth={true}
                                    loading={loading}
                                    className="mt-8"
                                >
                                    RESET PASSWORD
                                </Button>
                            </form>
                        </div>
                    );
            }

        default:
            return (
                <>
                    <div className="relative w-4/5 md:w-3/5 h-1/3 mb-4">
                        <Image
                            src={"/images/404.svg"}
                            alt="404"
                            objectFit="contain"
                            objectPosition={"center"}
                            layout="fill"
                        />
                    </div>

                    <h1 className="text-4xl font-bold mb-2">404 : Page Not Found</h1>
                    <p className="tracking-wide font-light text-2xl">
                        Please check the URL. No page exists with the given url.
                        <br /> Please go back to the{" "}
                        <Link href="/">
                            <a className="underline">homepage</a>
                        </Link>
                        .
                    </p>
                </>
            );
    }
};

export default AuthMode;
