import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { firestore } from "../../../services/firebase/firebaseClient";
import { upsertDocument } from "../../../services/firebase/queries/upsertDocument";

const submitResults = async (values: any) => {
    try {
        await upsertDocument(
            "results",
            {
                username: values.username,
                createdTimeAt: serverTimestamp(),
                time: values.time,
                wpm: values.wpm,
                accuracy: values.accuracy,
                gazeCount: values.gazeCount,
                rawConsistency: values.rawConsistency,
                actualConsistency: values.actualConsistency,
                listOfWPM: values.listOfWPM,
                listOfRawWPM: values.listOfRawWPM
            },
            {}
        );

        let userData: any = JSON.parse(localStorage.getItem("userData") as string);
        if (userData?.id) {
            await upsertDocument("users", { stage: ++userData.stage }, {}, false, userData.id);
            localStorage.setItem("userData", JSON.stringify(userData) as string);
        }

        return { status: "added result doc to firestore" };
    } catch (e) {
        console.error(e);
        return { status: "results failed to save in firestore", error: e };
    }
};

export default submitResults;
