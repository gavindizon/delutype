import { upsertDocument } from "../../../services/firebase/queries/upsertDocument";
import { auth, firestore } from "./../../../services/firebase/firebaseClient";
import { collection, query, where, getDocs, doc, updateDoc } from "firebase/firestore";
import form from "../../../data/signup.json";

const handleSignUpSubmit = async (values: any, signup: Function, setLoading: Function) => {
    setLoading(true);
    try {
        await signup(values.email, values.password, values.username);

        let codes = await getDocs(
            query(collection(firestore, "codes"), where("occupied", "==", false))
        );
        let result: any = []

        codes.forEach((code) => {
            result.push({...code.data(), id: code.id});
        })

        if (result.length !== 0) {
            upsertDocument("users", { ...values, code: result[0].code }, form, true);
            upsertDocument("codes", {username: values.username, occupied: true }, {}, true, result[0].id);
        }
        else {
            upsertDocument("users", { ...values, code: "X99" }, form, true);
        }

        // Add NOTIFICATION
        setLoading(false);
        return { status: "success" };
    } catch (e) {
        console.log (e)
        setLoading(false);

        return { status: "failed", error: e };
    }
};

export default handleSignUpSubmit;
