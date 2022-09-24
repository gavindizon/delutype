import { PayloadAction } from "@reduxjs/toolkit";
import { UPDATE_RESULT } from "../actions/result";

const initialState: Object = {
    wpm: 0,
    accuracy: 0,
    rawConsistency: 0,
    actualConsistency: 0,
    time: 0,
    createdAtTime: "",
};

const resultReducer = (state: Object = initialState, action: PayloadAction<any, string>) => {
    switch (action.type) {
        case UPDATE_RESULT:
            return {
                ...state,
                wpm: action.payload.wpm,
                accuracy: action.payload.accuracy,
                rawConsistency: action.payload.rawConsistency,
                actualConsistency: action.payload.actualConsistency,
                time: action.payload.time,
            };

        default:
            return state;
    }
};

export default resultReducer;
