import { AnyAction, Dispatch } from "redux";

export const UPDATE_SETTINGS = "UPDATE_SETTINGS";

export const setText = () => (dispatch: Dispatch<AnyAction>) => dispatch({ type: UPDATE_SETTINGS });
