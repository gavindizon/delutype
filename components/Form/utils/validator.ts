import { firestore } from "../../../services/firebase/firebaseClient";
import { collection, query, getDocs, where, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

export default function validator(
    validatorObject: any = {},
    name: string,
    label: string,
    currentValue: any,
    fieldValues: any,
    setLoading: Function,
    required: boolean = false,
    documentType?: string
) {
    let messages: Array<string> = [];

    if (required && (currentValue.trim() === "" || currentValue === null)) messages.push(label + " is required");

    Object.keys(validatorObject).forEach(async (key: string) => {
        switch (key) {
            case "matchesWith":
                if (currentValue !== fieldValues[validatorObject.matchesWith])
                    messages.push(label + " must match with " + validatorObject[key]);

                break;
            case "min":
                console.log;
                if (currentValue.length < validatorObject[key])
                    messages.push(label + " must be at least " + validatorObject[key] + " characters");
                break;
            case "max":
                if (currentValue.length > validatorObject[key])
                    messages.push(label + " must be at most " + validatorObject[key] + " characters");
                break;
            case "unique":
                setLoading(true);
                const querySnapshot = await getDocs(
                    query(collection(firestore, documentType as string), where(name, "==", currentValue))
                );
                const result: QueryDocumentSnapshot<DocumentData>[] = [];
                querySnapshot.forEach((snapshot) => {
                    result.push(snapshot);
                });
                if (result.length > 0)
                    messages.push(currentValue + " is already used by another user. Please try a different username");
                setLoading(false);

                break;
        }
    });

    return messages;
}
