import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import { IoPersonCircleSharp, IoKeySharp } from "react-icons/io5";

import validateForm from "../../components/Form/utils/validateForm";

import Button from "../../components/Button/Button";
import Layout from "../../components/Layout/Layout";
import Input from "../../components/Form/Input";
import { collection, DocumentData, getDoc, QueryDocumentSnapshot } from "firebase/firestore";
import { getDocument } from "../../services/firebase/queries/getDocument";
import { upsertDocument } from "../../services/firebase/queries/upsertDocument";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";

import useLanguage from "../../hooks/useLanguage";
import useAuth from "../../hooks/useAuth";

import form from "../../data/edit-profile.json";
import general from "../../data/general.json";
import { initializeFieldValues, initializeValidatorValues } from "../../components/Form/utils/initializeFieldValues";

const EditProfile: NextPage = () => {
    const { user, setUser, provider } = useAuth();
    const [hasDocument, setHasDocument] = useState(false);
    const router = useRouter();
    const lang = useLanguage();
    const genLang: any = general[lang as keyof typeof general];
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const passwordForm = form.filter((section) => section.title === "Password");
    const profileForm = form.filter((section) => section.title !== "Password");

    const [editProfileForm, setEditProfileForm] = useState(initializeFieldValues(profileForm));
    const [profileFormValidity, setProfileFormValidity] = useState(initializeValidatorValues(profileForm));
    const [editPasswordForm, setEditPasswordForm] = useState(initializeFieldValues(passwordForm));
    const [passwordFormValidity, setPasswordFormValidity] = useState(initializeFieldValues(passwordForm));

    useEffect(() => {
        setProfileFormValidity(editProfileForm);
    }, [editProfileForm]);

    useEffect(() => {
        setPasswordFormValidity(editPasswordForm);
    }, [editPasswordForm]);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                if (user?.email) {
                    const snapshot = (await getDocument(
                        "users",
                        "email",
                        user.email,
                        false
                    )) as QueryDocumentSnapshot<DocumentData>;
                    if (snapshot) setHasDocument(true);
                    setEditProfileForm((values: any) => {
                        return { ...values, ...snapshot?.data(), email: user.email, id: snapshot?.id };
                    });
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchUserData();
        //eslint-disable-next-line
    }, [user]);

    let data = [];

    return (
        <Layout title="Edit Profile" description="" lang={lang}>
            <section className="min-h-screen px-2 text-center flex flex-col mt-40 items-center relative">
                <div className="w-full flex flex-col justify-center items-center">
                    <h2 className="text-4xl font-extrabold mb-4">
                        {genLang["edit-profile"]}
                    </h2>
                    <p className="text-lg mb-8">
                        {genLang["edit-profile-subheader"]}
                    </p>
                    <form
                        className="w-full md:w-[640px] mb-32"
                        onSubmit={async (e) => {
                            try {
                                e.preventDefault();
                                setLoading(true);
                                await upsertDocument("users", editProfileForm, form, true, editProfileForm?.id);
                                setLoading(false);
                                router.push("/", "/");
                                setUser((user: any) => {
                                    return {
                                        ...user,
                                        isProfileUnfinished: false,
                                        displayName: editProfileForm?.username,
                                    };
                                });

                                dispatch({
                                    type: "OPEN_MODAL",
                                    payload: {
                                        type: "NOTIFICATION",
                                        title: "Profile Completed",
                                        description: "Profile successfully updated. You may now try out typhe.",
                                    },
                                });
                            } catch (err) {
                                console.error(err);
                            }
                        }}
                    >
                        {profileForm.map((section, index) => {
                            if (!user?.isProfileUnfinished && section.title === "") return;

                            return (
                                <div key={index}>
                                    <h3 className="text-3xl text-left mt-16 mb-8 font-bold">{genLang[section.title]}</h3>
                                    {section.fields.map((field) => (
                                        <Input
                                            key={field.name}
                                            disabled={field.name === "username" && hasDocument}
                                            {...field}
                                            validity={profileFormValidity}
                                            setValidity={setProfileFormValidity}
                                            fieldValues={editProfileForm}
                                            setForm={setEditProfileForm}
                                            value={editProfileForm[field.name]}
                                        />
                                    ))}
                                </div>
                            );
                        })}
                        <Button
                            type="submit"
                            isDisabled={!validateForm(profileFormValidity)}
                            isFullWidth={true}
                            loading={loading}
                            className="mt-32"
                            leftIcon={<IoPersonCircleSharp size={18} />}
                        >
                            {genLang["edit-profile"]}
                        </Button>
                    </form>
                    {provider === "password" && (
                        <form
                            className="w-full md:w-[640px] mb-32"
                            onSubmit={async (e) => {
                                try {
                                    e.preventDefault();
                                } catch (err) {}
                            }}
                        >
                            {passwordForm.map((section, index) => {
                                return (
                                    <div key={index}>
                                        <h3 className="text-2xl text-left mt-2 mb-4 font-semibold ">{section.title}</h3>
                                        <hr className="mb-3" />
                                        {section.fields.map((field) => (
                                            <Input
                                                key={field.name}
                                                {...field}
                                                validity={passwordFormValidity}
                                                setValidity={setPasswordFormValidity}
                                                fieldValues={passwordForm}
                                                setForm={setEditPasswordForm}
                                                value={editPasswordForm[field.name]}
                                            />
                                        ))}
                                    </div>
                                );
                            })}
                            <Button
                                type="submit"
                                isDisabled={!validateForm(passwordFormValidity)}
                                isFullWidth={true}
                                loading={loading}
                                className="mt-8"
                                leftIcon={<IoKeySharp size={18} />}
                            >
                                Update Password
                            </Button>
                        </form>
                    )}
                </div>
            </section>
        </Layout>
    );
};

export default EditProfile;
