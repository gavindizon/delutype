import { combineReducers } from "redux";
import modalReducer from "./modal";
import testReducer from "./test";
import resultReducer from "./result";

const reducer = combineReducers({
    modal: modalReducer,
    test: testReducer,
    result: resultReducer,
});

export default reducer;
