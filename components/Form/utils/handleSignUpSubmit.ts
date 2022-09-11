import { upsertDocument } from "../../../services/firebase/queries/upsertDocument";
import form from "../../../data/signup.json";

const handleSignUpSubmit = async (values: any, signup: Function, setLoading: Function) => {
    setLoading(true);
    try {
        await signup(values.email, values.password, values.username);
        await upsertDocument("users", values, form, true);

        // Add NOTIFICATION
        setLoading(false);
        return { status: "success" };
    } catch (e) {
        setLoading(false);

        return { status: "failed", error: e };
    }
};

export default handleSignUpSubmit;
