import { sendEmailVerification, updateProfile } from "firebase/auth";
import {
    collection,
    query,
    getDocs,
    where,
    QueryDocumentSnapshot,
    DocumentData,
    addDoc,
    serverTimestamp,
} from "firebase/firestore";
import { firestore } from "../../../services/firebase/firebaseClient";

const handleSignUpSubmit = async (values: any, signup: Function, setLoading: Function) => {
    setLoading(true);
    try {
        await signup(values.email, values.password, values.username);
        await addDoc(collection(firestore, "users"), {
            email: values.email,
            username: values.username,
            firstName: values.firstName,
            lastName: values.lastName,
            sex: values.sex,
            datesAvailable: values.datesAvailable,
            isEligibleInDLSU: values.isEligibleInDLSU,
            birthDate: new Date(values.birthDate),
            createdTimeAt: serverTimestamp(),
            updatedTimeAt: serverTimestamp(),
        });

        // Add NOTIFICATION

        setLoading(false);
    } catch (e) {
        setLoading(false);
    }
};

export default handleSignUpSubmit;
