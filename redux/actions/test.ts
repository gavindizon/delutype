import { AnyAction, Dispatch } from "redux";

export const ADD_GAZE_COUNT = "ADD_GAZE_COUNT";

export const addGazeCount = () => (dispatch: Dispatch<AnyAction>) => dispatch({ type: ADD_GAZE_COUNT });
