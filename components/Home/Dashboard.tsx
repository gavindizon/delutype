import React, { FC, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";

import Input from "../../components/Form/Input";
import Button from "../../components/Button/Button";
import Image from "next/image";

import validateForm from "../../components/Form/utils/validateForm";
import form from "../../data/testconfig.json";

import { initializeFieldValues, initializeValidatorValues } from "../../components/Form/utils/initializeFieldValues";
import { useDispatch } from "react-redux";

type Props = {
    user: any;
};

const Dashboard: FC<Props> = ({ user }) => {
    const dispatch = useDispatch();
    const [testConfigForm, setTestConfigForm] = useState(initializeFieldValues(form));
    const [validity, setValidity] = useState(initializeValidatorValues(form));
    const [loading] = useState(false);
    const router = useRouter();

    return (
        <section className="min-h-screen text-center flex flex-col mt-32 items-center relative">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="mb-4">
                    {user?.photoUrl || user?.picture ? (
                        <div className="w-24 h-24 relative rounded-full overflow-hidden">
                            <Image
                                src={user?.photoUrl || user?.picture}
                                alt={user.displayName}
                                layout="fill"
                                objectFit="contain"
                                objectPosition={"center"}
                            />
                        </div>
                    ) : (
                        <IoPersonCircleSharp size={128} />
                    )}
                </div>
                {(user?.displayName || user?.email) && (
                    <h2 className="text-3xl text-bold">{user.displayName || user.email.split("@")[0]}</h2>
                )}
                <div className="my-4 flex md:flex-row flex-col  md:space-x-4 space-y-4 md:space-y-0 w-full md:w-auto">
                    <Button href="/profile/edit" rightIcon={<FaEdit size={18} />}>
                        Edit Account
                    </Button>
                    <Button variant="danger" rightIcon={<FaTrash size={18} color="white" />}>
                        Delete Account
                    </Button>
                </div>
            </div>
            <div>
                <form
                    className="w-full md:w-[640px] mb-32 flex flex-col justify-center items-center"
                    onSubmit={(e) => {
                        e.preventDefault();
                        dispatch({
                            type: "UPDATE_SETTINGS",
                            payload: {
                                showWPM: testConfigForm.showWPM,
                            },
                        });

                        setValidity(initializeValidatorValues(form));
                        setTestConfigForm(initializeFieldValues(form));
                        router.push(`/test/calibration`);
                    }}
                >
                    <Button
                        type="submit"
                        isDisabled={!validateForm(validity)}
                        isFullWidth
                        loading={loading}
                        className="mt-8"
                    >
                        Start Test
                    </Button>
                    {form.map((section: any, index: any) => {
                        return (
                            <div key={index}>
                                {section.fields.map((field: any) => (
                                    <Input
                                        key={field.name}
                                        {...field}
                                        label={null}
                                        validity={validity}
                                        setValidity={setValidity}
                                        fieldValues={testConfigForm}
                                        setForm={setTestConfigForm}
                                        value={testConfigForm[field.name]}
                                    />
                                ))}
                            </div>
                        );
                    })}
                </form>
            </div>
            <div className="w-full text-left">
                <h2 className="text-3xl font-semibold mb-4">History</h2>

                <table className="w-full">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Layout</th>
                            <th>WPM</th>
                            <th>Accuracy</th>
                            <th>Consistency</th>
                            <th>Duration</th>
                            <th>Datetime</th>
                        </tr>
                    </thead>
                    <tbody>
                        {/* <tr>
                    <td>1</td>
                    <td>QWERTY</td>
                    <td>123</td>
                    <td>98%</td>
                    <td>100%</td>
                    <td>132s</td>
                    <td>{new Date().toUTCString()}</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td>QWERTY</td>
                    <td>123</td>
                    <td>98%</td>
                    <td>100%</td>
                    <td>132s</td>
                    <td>{new Date().toUTCString()}</td>
                </tr> */}
                    </tbody>
                </table>
                <p className="text-center my-4">No data found yet. Try starting a test.</p>
            </div>
        </section>
    );
};

export default Dashboard;
