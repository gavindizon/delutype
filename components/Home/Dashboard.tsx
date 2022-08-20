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
            <div className="w-full text-left">
                <h2 className="text-3xl font-semibold mb-4">History</h2>

                <table className="w-full">
                    <tr>
                        <th>#</th>
                        <th>Layout</th>
                        <th>WPM</th>
                        <th>Accuracy</th>
                        <th>Consistency</th>
                        <th>Duration</th>
                        <th>Datetime</th>
                    </tr>
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
                </table>
                <p className="text-center my-4">No data found yet. Try starting a test.</p>
            </div>
        </section>
    );
};

export default Dashboard;
