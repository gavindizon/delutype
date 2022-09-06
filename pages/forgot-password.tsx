import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { IoPersonCircleSharp } from "react-icons/io5";

import Layout from "../components/Layout/Layout";
import Input from "../components/Form/Input";
import Button from "../components/Button/Button";

import validateForm from "../components/Form/utils/validateForm";
import handleSignUpSubmit from "../components/Form/utils/handleSignUpSubmit";

import useAuth from "../hooks/useAuth";
import useLanguage from "../hooks/useLanguage";

import form from "../data/email.json";
import { initializeFieldValues, initializeValidatorValues } from "../components/Form/utils/initializeFieldValues";

type Props = {};

const SignUp: FC<Props> = () => {
    const [status, setStatus] = useState("");
    const [sendEmailForm, setSendEmailForm] = useState(initializeFieldValues(form, false));
    const [validity, setValidity] = useState(initializeValidatorValues(form, false));
    const [loading, setLoading] = useState(false);

    const lang = useLanguage();
    const { sendEmailResetPassword } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const { status } = router.query;
            setStatus((status as string) || "");
        }
    }, [router]);

    return (
        <Layout title="Sign Up" description="" lang={lang}>
            <section className="min-h-screen px-2 text-center flex flex-col mt-32 items-center relative">
                {status === "" ? (
                    <div className="w-full flex flex-col justify-center items-center">
                        <h2 className="text-4xl font-semibold mb-4">Forgot password</h2>
                        <p className="tracking-wide text-lg mb-8 ">
                            Send us the email you used in creating your account and we will email you the code to reset
                            your password.
                        </p>
                        <form
                            className="flex flex-col w-full md:w-[640px] mb-32"
                            onSubmit={async (e) => {
                                try {
                                    e.preventDefault();

                                    let result = await sendEmailResetPassword(sendEmailForm.email);
                                    router.push(`?status=${result.status}`, undefined, { shallow: false });
                                } catch (err) {
                                    router.push("?status=failed", undefined, { shallow: false });
                                }
                            }}
                        >
                            {form.map((field) => (
                                <Input
                                    key={field.name}
                                    {...field}
                                    validity={validity}
                                    setValidity={setValidity}
                                    fieldValues={sendEmailForm}
                                    setForm={setSendEmailForm}
                                    value={sendEmailForm[field.name]}
                                />
                            ))}
                            <Button
                                type="submit"
                                isDisabled={!validateForm(validity)}
                                isFullWidth={false}
                                loading={loading}
                                className="mt-8"
                                leftIcon={<IoPersonCircleSharp size={18} />}
                            >
                                Send Email
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center">
                        <div className="relative w-4/5 md:w-3/5 h-1/3 mb-4">
                            <Image
                                src={`/images/${status === "success" ? "verified" : "denied"}.svg`}
                                alt="Account"
                                objectFit="contain"
                                objectPosition={"center"}
                                layout="fill"
                            />
                        </div>
                        <h1 className="text-4xl font-bold mb-2">
                            {status === "success" ? "Check your email" : "Something went wrong"}
                        </h1>
                        <p className="tracking-wide font-light text-2xl">
                            {status === "success"
                                ? "We have sent you a link to reset your password."
                                : "There seems to be an error on our end. Please try again later."}
                        </p>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default SignUp;
