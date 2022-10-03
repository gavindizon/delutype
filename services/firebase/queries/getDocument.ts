import { collection, getDocs, query, QueryDocumentSnapshot, DocumentData, where } from "firebase/firestore";
import { firestore } from "../firebaseClient";

export const getDocument = async (
    collectionName: string,
    fieldName: string,
    fieldValue: string,
    isMultiple: boolean = false
) => {
    const querySnapshot = await getDocs(
        query(collection(firestore, collectionName), where(fieldName, "==", fieldValue))
    );
    const result: QueryDocumentSnapshot<DocumentData>[] = [];
    querySnapshot.forEach((snapshot: any) => {
        result.push({ ...snapshot.data(), id: snapshot.id });
    });
    if (result.length > 0) return !!isMultiple ? result : result[0];

    return null;
};
