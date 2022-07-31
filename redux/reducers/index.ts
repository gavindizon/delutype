import { combineReducers } from "redux";
import modalReducer from "./modal";

const reducer = combineReducers({
    modal: modalReducer,
});

export default reducer;
