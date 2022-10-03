import { getDocs, query, collection, where } from "firebase/firestore";
import { firestore } from "./../../../services/firebase/firebaseClient";

const assignCode = async () => {
    let codes = await getDocs(query(collection(firestore, "codes"), where("occupied", "==", false)));
    let result: any = [];

    codes.forEach((code) => {
        result.push({ ...code.data(), id: code.id });
    });

    return result[0];
};

export default assignCode;
