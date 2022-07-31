import { ActionCreatorWithNonInferrablePayload } from "@reduxjs/toolkit";
import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

const initialState: Object = {
    name: "",
    isActive: false,
};

const modalReducer = (state: Object = initialState, action: ActionCreatorWithNonInferrablePayload) => {
    switch (action.type) {
        case OPEN_MODAL:
            return { ...state, isActive: true };
        case CLOSE_MODAL:
            return { ...state, isActive: false };
        default:
            return state;
    }
};

export default modalReducer;
