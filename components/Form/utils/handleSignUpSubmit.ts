import { upsertDocument } from "../../../services/firebase/queries/upsertDocument";
import { auth, firestore } from "./../../../services/firebase/firebaseClient";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import form from "../../../data/signup.json";
import assignCode from "./assignCode";

const handleSignUpSubmit = async (values: any, signup: Function, setLoading: Function) => {
    setLoading(true);
    try {
        await signup(values.email, values.password, values.username);

        let result = await assignCode();

        if (result) {
            await upsertDocument("users", { ...values, code: result.code }, form, true);
            await upsertDocument("codes", { username: values.username, occupied: true }, {}, true, result.id);
        } else {
            await upsertDocument("users", { ...values, code: "X99" }, form, true);
        }

        // Add NOTIFICATION
        setLoading(false);
        return { status: "success" };
    } catch (e) {
        setLoading(false);

        return { status: "failed", error: e };
    }
};

export default handleSignUpSubmit;
