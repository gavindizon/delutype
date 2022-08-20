import React, { FC } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { IoPersonCircleSharp } from "react-icons/io5";
import Button from "../Button/Button";
type Props = {
    user: any;
};

const Dashboard: FC<Props> = ({ user }) => {
    return (
        <section className="min-h-screen px-2 text-center flex flex-col mt-32 items-center relative">
            <div className="w-full flex flex-col justify-center items-center">
                <div className="mr-2 mb-4">{user.photoUrl ? <></> : <IoPersonCircleSharp size={128} />}</div>
                <h2 className="text-3xl text-bold">{user.displayName || user.email.split("@")[0]}</h2>
                <div className="my-4 flex md:flex-row flex-col  md:space-x-4 space-y-4 md:space-y-0 w-full md:w-auto">
                    <Button rightIcon={<FaEdit size={18} />}>Edit Account</Button>
                    <Button variant="danger" rightIcon={<FaTrash size={18} color="white" />}>
                        Delete Account
                    </Button>
                </div>
            </div>
        </section>
    );
};

export default Dashboard;
