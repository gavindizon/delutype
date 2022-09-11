import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../../services/firebase/firebaseClient";

const submitResults = async (values: any) => {
    try {
        await addDoc(collection(firestore, "results"), {
            username: values.username,
            createdTimeAt: serverTimestamp(),
            time: values.time,
            wpm: values.wpm,
            accuracy: values.accuracy,
            gazeCount: values.gazeCount,
            consistency: values.consistency,
        });

        return { status: "added result doc to firestore" };
    } catch (e) {
        return { status: "results failed to save in firestore", error: e };
    }
};

export default submitResults;
