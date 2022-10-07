import { getStandardDeviation, getMean } from "../utils/calculate";
import submitResults from "../../Form/utils/submitResults";
import HandleEndGame from "../types/HandleEndGame";

export async function handleEndGame({
    time,
    correctChar,
    errorChar,
    text,
    dispatch,
    addGaze,
    removeGaze,
    setRunning,
    listOfRawWPM,
    listOfWPM,
    gazeCount,
    gazeUpLog,
    gazeDownLog,
    typeLog,
    resetTyping,
    setTime,
    setGazeCount,
    setIsFocused,
    setListenerActivated,
}: HandleEndGame) {
    setRunning(false);
    let user: any;

    if (window) {
        window.removeEventListener("addGaze", addGaze);
        window.removeEventListener("removeGaze", removeGaze);
        user = JSON.parse(localStorage.getItem("userData") as string);
    }

    let finalResults: object;

    finalResults = {
        wpm: Math.round(((60 / time) * correctChar) / 5) || 0,
        accuracy: Number.parseFloat((((correctChar - errorChar) / text.length) * 100).toFixed(2)),
        rawConsistency: (getStandardDeviation(listOfRawWPM) / getMean(listOfRawWPM)) * 100,
        actualConsistency: (getStandardDeviation(listOfWPM) / getMean(listOfWPM)) * 100,
        listOfRawWPM: listOfRawWPM.join(", "),
        listOfWPM: listOfWPM.join(", "),
        time,
        gazeCount,
        gazeDownLog,
        gazeUpLog,
        typeLog,
    };

    await submitResults({ ...finalResults, username: user.username });
    dispatch({ type: "UPDATE_RESULT", payload: finalResults });

    dispatch({
        type: "OPEN_MODAL",
        payload: {
            type: "NOTIFICATION",
            title: "Test done!",
            description: "Thank you for finishing the typing test. Would you like to perform the test again?",
            redirectTo: "/test",
            redirectToLabel: "YES",
            addOns: {
                backTo: "/",
                backToLabel: "BACK TO HOME",
            },
        },
    });

    setGazeCount(0);
    resetTyping();
    setListenerActivated(false);
    setTime(0);
    setIsFocused(false);
}
