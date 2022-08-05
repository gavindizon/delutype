import axios from "axios";

console.log(process.env.FIREBASE_CLOUD_FUNCTIONS);
export const axiosInstance = axios.create({
    baseURL: process.env.FIREBASE_CLOUD_FUNCTIONS,
});
