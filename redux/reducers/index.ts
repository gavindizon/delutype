import { combineReducers } from "redux";
import modalReducer from "./modal";
import testSettingsReducer from "./testSettings";
import resultReducer from "./result";

const reducer = combineReducers({
    modal: modalReducer,
    settings: testSettingsReducer,
    result: resultReducer,
});

export default reducer;
