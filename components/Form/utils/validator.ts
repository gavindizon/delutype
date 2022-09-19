import { firestore } from "../../../services/firebase/firebaseClient";
import { collection, query, getDocs, where, QueryDocumentSnapshot, DocumentData } from "firebase/firestore";

import labelLang from "../../../data/field-labels.json"

const REGEX_EMAIL =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

export default async function validator(
    lang: any,
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

    const fieldLabel: any = labelLang[lang as keyof typeof labelLang];

    if (
        required &&
        ((typeof currentValue === "string" && currentValue?.trim() === "") ||
            currentValue.length === 0 ||
            currentValue === null)
    )
        {lang === "en" ?
        messages.push(fieldLabel[label] + " is required.")
        : messages.push("Ang " + fieldLabel[label].toLowerCase() + " ay kailangan.")}

    for (const key of Object.keys(validatorObject)) {
        switch (key) {
            case "matchesWith":
                if (currentValue !== fieldValues[validatorObject.matchesWith])
                    {lang === "en" 
                    ? messages.push(fieldLabel[label] + " must match with " + validatorObject[key] + ".")
                    : messages.push("Ang " + fieldLabel[label].toLowerCase() + " ay dapat tugma sa " + validatorObject[key] + ".")}

                break;

            case "min":
                if (currentValue.length < validatorObject[key]) {
                    {lang === "en"
                    ? typeof currentValue === "string"
                        ? messages.push(fieldLabel[label] + " must be at least " + validatorObject[key] + " characters.")
                        : messages.push(fieldLabel[label] + " must choose at least " + validatorObject[key] + " option.")
                    : typeof currentValue === "string"
                        ? messages.push("Ang " + fieldLabel[label].toLowerCase() + " ay dapat hihigit ng " + validatorObject[key] + " na letra.")
                        : messages.push("Ang " + fieldLabel[label].toLowerCase() + " ay kailangan ng kahit " + validatorObject[key] + " na opsyon.");
                    }
                }
                break;

            case "max":
                if (currentValue.length > validatorObject[key])
                    {lang === "en" 
                    ? messages.push(fieldLabel[label] + " must be at most " + validatorObject[key] + " characters.")
                    : messages.push(fieldLabel[label] + " ay dapat hindi hahaba ng " + validatorObject[key] + " na letra.");}
                break;

            case "email":
                if (!currentValue.toLowerCase().match(REGEX_EMAIL))
                    {lang === "en"
                    ? messages.push(fieldLabel[label] + " must be a valid email address.")
                    : messages.push("Ang " + fieldLabel[label].toLowerCase() + " ay dapat balido.")}
                break;

            case "unique":
                setLoading(true);
                const querySnapshot = await getDocs(
                    query(collection(firestore, documentType as string), where(name, "==", currentValue))
                );
                const result: QueryDocumentSnapshot<DocumentData>[] = [];
                querySnapshot.forEach((snapshot) => {
                    snapshot.data();
                    result.push(snapshot);
                });
                if (result.length > 0) {
                    {lang === "en"
                    ? messages.push("'" + currentValue + "'" + " is already used by another user. Please try a different " + fieldLabel[label].toLowerCase() + ".")
                    : messages.push("Ang '" + currentValue + "'" + " ay ginagamit na ng isang user. Gumamit ng ibang " + fieldLabel[label].toLowerCase() + ".")}
                }
                setLoading(false);
                break;
        }
    }

    return messages;
}
