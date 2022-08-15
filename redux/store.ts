import { HYDRATE, createWrapper } from "next-redux-wrapper";
import reducer from "./reducers/index";
import { configureStore } from "@reduxjs/toolkit";

// creating store
export const store = configureStore({ reducer });

// assigning store to next wrapper
const initializeStore = () => store;

export const wrapper = createWrapper(initializeStore);
