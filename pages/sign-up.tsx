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

import form from "../data/signup.json";
import { initializeFieldValues, initializeValidatorValues } from "../components/Form/utils/initializeFieldValues";

type Props = {};

const SignUp: FC<Props> = () => {
    const [status, setStatus] = useState("");
    const [signUpForm, setSignUpForm] = useState(initializeFieldValues(form));
    const [validity, setValidity] = useState(initializeValidatorValues(form));
    const [loading, setLoading] = useState(false);

    const lang = useLanguage();
    const { signup } = useAuth();
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
                        <h2 className="text-4xl font-semibold mb-4">Sign Up</h2>
                        <p className="tracking-wide text-lg mb-8 ">
                            Sign-up today and help us discover a better alternative for QWERTY
                        </p>
                        <form
                            className="w-full md:w-[640px] mb-32"
                            onSubmit={async (e) => {
                                try {
                                    e.preventDefault();

                                    await handleSignUpSubmit(signUpForm, signup, setLoading);
                                    router.push("?status=success", undefined, { shallow: false });
                                } catch (err) {
                                    router.push("?status=failed", undefined, { shallow: false });
                                }
                            }}
                        >
                            {form.map((section, index) => {
                                return (
                                    <div key={index}>
                                        <h3 className="text-2xl text-left mt-2 mb-4 font-semibold ">{section.title}</h3>
                                        <hr className="mb-3" />
                                        {section.fields.map((field) => (
                                            <Input
                                                key={field.name}
                                                {...field}
                                                validity={validity}
                                                setValidity={setValidity}
                                                fieldValues={signUpForm}
                                                setForm={setSignUpForm}
                                                value={signUpForm[field.name]}
                                            />
                                        ))}
                                    </div>
                                );
                            })}
                            <Button
                                type="submit"
                                isDisabled={!validateForm(validity)}
                                isFullWidth
                                loading={loading}
                                className="mt-8"
                                leftIcon={<IoPersonCircleSharp size={18} />}
                            >
                                SIGN UP
                            </Button>
                        </form>
                    </div>
                ) : (
                    <div className="fixed top-0 left-0 w-full h-screen flex flex-col justify-center items-center">
                        <div className="relative w-4/5 md:w-3/5 h-1/3 mb-4">
                            <Image
                                src={"/images/account.svg"}
                                alt="Account"
                                objectFit="contain"
                                objectPosition={"center"}
                                layout="fill"
                            />
                        </div>
                        <h1 className="text-4xl font-bold mb-2">Successfully created an Account</h1>
                        <p className="tracking-wide font-light text-2xl">
                            Please check the email we sent you to verify the account.
                        </p>
                    </div>
                )}
            </section>
        </Layout>
    );
};

export default SignUp;
