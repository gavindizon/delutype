import { combineReducers } from "redux";
import modalReducer from "./modal";
import testReducer from "./test";

const reducer = combineReducers({
    modal: modalReducer,
    test: testReducer,
});

export default reducer;
