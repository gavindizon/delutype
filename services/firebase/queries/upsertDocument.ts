import { collection, updateDoc, doc, serverTimestamp, addDoc } from "firebase/firestore";
import sanitizeValues from "../../../components/Form/utils/sanitizeValues";
import { firestore, auth } from "../firebaseClient";

export const upsertDocument = async (
    collectionName: string,
    values: any,
    form: any,
    withSection: boolean = false,
    documentId?: string
) => {
    let docValues = Object.keys(form).length === 0 ? values : sanitizeValues(values, form, withSection);

    if (documentId) {
        const ref = doc(firestore, collectionName, documentId);
        await updateDoc(ref, { ...docValues, updatedTimeAt: serverTimestamp() });
    } else {
        if (collectionName === "users") docValues["stage"] = 0;

        await addDoc(collection(firestore, collectionName), {
            ...docValues,
            createdTimeAt: serverTimestamp(),
            updatedTimeAt: serverTimestamp(),
        });
    }
};
