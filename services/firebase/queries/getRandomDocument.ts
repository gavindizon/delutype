import {
    collection,
    getDocs,
    query,
    QueryDocumentSnapshot,
    DocumentData,
    where,
    limit,
    orderBy,
} from "firebase/firestore";
import { firestore } from "../firebaseClient";
import adminApp from "../firebaseAdmin";

export const getRandomDocument = async (collectionName: string, length: number) => {
    let querySnapshot = await adminApp
        .firestore()
        .collection(collectionName)
        .where("random", ">=", Math.floor(Math.random() * length + 1))
        .orderBy("random", "asc")
        .limit(1)
        .get();

    const result: any = [];
    querySnapshot.forEach((snapshot) => {
        result.push({ ...snapshot.data() });
    });

    return result[0];
};
