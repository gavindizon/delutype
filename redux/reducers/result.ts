import { ActionCreatorWithNonInferrablePayload, ActionCreatorWithPayload, PayloadAction } from "@reduxjs/toolkit";
import { UPDATE_RESULT } from "../actions/result";

const initialState: Object = {
    wpm: 0,
    accuracy: 0,
    consistency: 0,
    time: 0,
};

const resultReducer = (
    state: Object = initialState,
    action : PayloadAction<any, string>
) => {
    switch (action.type) {
        case UPDATE_RESULT:
            console.log(state);
            console.log(action);
            return {
                ...state,
                wpm: action.payload.wpm,
                accuracy: action.payload.accuracy,
                consistency: action.payload.consistency,
                time: action.payload.time,
            };
            

        default:
            return state;
    }
};

export default resultReducer;
