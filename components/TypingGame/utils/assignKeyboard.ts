import { Dispatch, AnyAction } from "redux";

const assignKeyboard = (dispatch: Dispatch<AnyAction>) => {
    let layout = "QWERTY";
    let userData;

    if (window) userData = JSON.parse(localStorage.getItem("userData") as string);

    // assigns keyboard Layout
    switch (userData?.code?.[0]) {
        case "S":
            layout = "Salvo";
            break;
        case "X":
        case "Q":
        default:
            layout = "QWERTY";
    }

    dispatch({
        type: "UPDATE_SETTINGS",
        payload: {
            layout,
        },
    });
};

export default assignKeyboard;
