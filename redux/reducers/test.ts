import { ActionCreatorWithNonInferrablePayload } from "@reduxjs/toolkit";
import { ADD_GAZE_COUNT } from "../actions/test";

const initialState: Object = {
    gazeCounts: 0,
};

const testReducer = (state: any = initialState, action: ActionCreatorWithNonInferrablePayload) => {
    switch (action.type) {
        case ADD_GAZE_COUNT:
            console.log("ADDING");
            return { ...state, gazeCounts: state.gazeCounts + 1 };

        default:
            return state;
    }
};

export default testReducer;
