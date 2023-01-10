import { getDocs, query, collection, where } from "firebase/firestore";
import { firestore } from "../../../services/firebase/firebaseClient";

const getUserTests = async (displayName : string) => {
    let userTests = await getDocs(query(collection(firestore, "results"), where("username", "==", displayName)));
    let result: any = [];

    userTests.forEach((userTest) => {
        result.push({ ...userTest.data(), id: userTest.id });
    });

    return result;
};

export default getUserTests;
