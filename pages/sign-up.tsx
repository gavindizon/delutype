import React, { FC, useEffect, useState } from "react";
import Layout from "../components/Layout/Layout";
import useLanguage from "../hooks/useLanguage";
import form from "../data/signup.json";
import Input from "../components/Form/Input";
import Button from "../components/Button/Button";
import { IoPersonCircleSharp } from "react-icons/io5";
type Props = {};

const SignUp: FC<Props> = () => {
    const lang = useLanguage();

    const fields: any = {};
    form.forEach((section) =>
        section.fields.forEach((field) => {
            switch (field.type) {
                case "checkbox":
                    fields[field.name] = [];
                    break;
                default:
                    fields[field.name] = "";
            }
        })
    );

    const [signUpForm, setSignUpForm] = useState(fields);

    // useEffect(() => {
    //     console.log(signUpForm);
    // }, [signUpForm]);

    return (
        <Layout title="Sign Up" description="" lang={lang}>
            <section className="min-h-screen px-2 text-center flex flex-col mt-32 items-center relative">
                <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="text-4xl font-semibold mb-4">Sign Up</h2>
                    <p className="tracking-wide text-lg mb-8 ">
                        Sign-up today and help us discover a better alternative for QWERTY
                    </p>
                    <form className="w-full md:w-[640px] mb-32">
                        {form.map((section, index) => {
                            return (
                                <div key={index}>
                                    <h3 className="text-2xl text-left mt-2 mb-4 font-semibold ">{section.title}</h3>
                                    <hr className="mb-3" />
                                    {section.fields.map((field) => (
                                        <Input
                                            key={field.name}
                                            {...field}
                                            onChange={(e: React.ChangeEvent<any> | any) => {
                                                if (field.type !== "checkbox")
                                                    setSignUpForm({ ...signUpForm, [field.name]: e.target.value });
                                                else {
                                                    let values: Array<any> = signUpForm[field.name];

                                                    if (e.status) values.push(e.value);
                                                    else values = values.filter((value) => e.value !== value);

                                                    setSignUpForm({
                                                        ...signUpForm,
                                                        [field.name]: values,
                                                    });
                                                }
                                            }}
                                            value={signUpForm[field.name]}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                        <Button type="submit" isFullWidth className="mt-8" leftIcon={<IoPersonCircleSharp size={18} />}>
                            SIGN UP
                        </Button>
                    </form>
                </div>
            </section>
        </Layout>
    );
};

export default SignUp;
