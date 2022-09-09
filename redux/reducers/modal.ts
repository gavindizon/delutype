import { AnyAction } from "@reduxjs/toolkit";
import { OPEN_MODAL, CLOSE_MODAL } from "../actions/modal";

const initialState: Object = {
    type: "",
    isActive: false,
    title: "",
    description: "",
    redirectTo: "",
    redicrectToLabel: "",
    addOns: {},
};

const modalReducer = (state: Object = initialState, action: AnyAction) => {
    switch (action.type) {
        case OPEN_MODAL:
            return { isActive: true, ...action.payload };
        case CLOSE_MODAL:
            return { ...state, isActive: false };
        default:
            return state;
    }
};

export default modalReducer;
