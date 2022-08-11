import { AnyAction, Dispatch } from "redux";

export const UPDATE_RESULT = "UPDATE_RESULT";

export const updateResult = (results:  object) => (dispatch: Dispatch<AnyAction>) => dispatch({ type: UPDATE_RESULT, results: results});
