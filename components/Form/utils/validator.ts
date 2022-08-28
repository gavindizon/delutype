import { firestore } from "../../../services/firebase/firebaseClient";
import { collection, query, getDocs, where, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

const REGEX_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default async function validator(
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

    if (
        required &&
        ((typeof currentValue === "string" && currentValue?.trim() === "") ||
            currentValue.length === 0 ||
            currentValue === null)
    )
        messages.push(label + " is required");

    for (const key of Object.keys(validatorObject)) {
        switch (key) {
            case "matchesWith":
                if (currentValue !== fieldValues[validatorObject.matchesWith])
                    messages.push(label + " must match with " + validatorObject[key]);

                break;
            case "min":
                if (currentValue.length < validatorObject[key]) {
                    typeof currentValue === "string"
                        ? messages.push(label + " must be at least " + validatorObject[key] + " characters")
                        : messages.push(label + " must choose at least " + validatorObject[key] + " option");
                }
                break;
            case "max":
                if (currentValue.length > validatorObject[key])
                    messages.push(label + " must be at most " + validatorObject[key] + " characters");
                break;

            case "email":
                if (!currentValue.toLowerCase().match(REGEX_EMAIL))
                    messages.push(label + " must be a valid email address");
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
                if (result.length > 0) {
                    messages.push(currentValue + " is already used by another user. Please try a different " + label);
                }
                setLoading(false);
                break;
        }
    }

    //  Object.keys(validatorObject).forEach(async (key: string) => {

    // });

    return messages;
}
