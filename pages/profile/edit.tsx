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
import assignCode from "../../components/Form/utils/assignCode";

const EditProfile: NextPage = () => {
    const { user, setUser, provider } = useAuth();
    const [hasDocument, setHasDocument] = useState(false);
    const router = useRouter();
    const lang = useLanguage();
    const genLang: any = general[lang as keyof typeof general];
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const passwordForm = form.filter((section) => section.title === "password");
    const profileForm = form.filter((section) => section.title !== "password");

    const [editProfileForm, setEditProfileForm] = useState(initializeFieldValues(profileForm));
    const [profileFormValidity, setProfileFormValidity] = useState(initializeValidatorValues(profileForm));

    const [editPasswordForm, setEditPasswordForm] = useState(initializeFieldValues(passwordForm));
    const [passwordFormValidity, setPasswordFormValidity] = useState(initializeValidatorValues(passwordForm));

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
                    if (snapshot) {
                        setHasDocument(true);
                        setEditProfileForm((values: any) => {
                            return { ...values, ...snapshot, email: user.email };
                        });
                    }
                }
            } catch (e) {
                console.error(e);
            }
        };

        fetchUserData();
        //eslint-disable-next-line
    }, [user]);

    return (
        <Layout title="Edit Profile" description="" lang={lang}>
            <section className="min-h-screen px-2 text-center flex flex-col mt-40 items-center relative">
                <div className="w-full flex flex-col justify-center items-center">
                    <h1 className="font-extrabold text-3xl sm:text-4xl sm:leading-snug md:text-5xl md:leading-snug mb-4">{genLang["edit-profile"]}</h1>
                    <p className="text-lg mb-8">{genLang["edit-profile-subheader"]}</p>
                    <form
                        className="w-full md:w-[640px] mb-32"
                        onSubmit={async (e) => {
                            try {
                                e.preventDefault();
                                setLoading(true);
                                if (!hasDocument) {
                                    let result = await assignCode();

                                    if (result) {
                                        await upsertDocument(
                                            "users",
                                            { ...editProfileForm, code: result.code },
                                            form,
                                            true,
                                            editProfileForm?.id
                                        );
                                        await upsertDocument(
                                            "codes",
                                            { username: editProfileForm.username, occupied: true },
                                            {},
                                            true,
                                            result.id
                                        );
                                    } else {
                                        await upsertDocument(
                                            "users",
                                            { ...editProfileForm, code: "X99" },
                                            form,
                                            true,
                                            editProfileForm?.id
                                        );
                                    }
                                } else {
                                    delete (form as any)?.code;
                                    await upsertDocument("users", editProfileForm, form, true, editProfileForm?.id);
                                }
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
                                    <h3 className="text-3xl text-left mt-16 mb-8 font-bold">
                                        {genLang[section.title]}
                                    </h3>
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
                            isDisabled={false}
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
                                        <h3 className="text-3xl text-left mt-16 mb-8 font-bold">
                                            {genLang[section.title]}
                                        </h3>
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
                                className="mt-32"
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
