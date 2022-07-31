import { AnyAction, Dispatch } from "redux";

export const OPEN_MODAL = "OPEN_MODAL";
export const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = () => (dispatch: Dispatch<AnyAction>) => dispatch({ type: OPEN_MODAL });
export const closeModal = () => (dispatch: Dispatch<AnyAction>) => dispatch({ type: CLOSE_MODAL });
