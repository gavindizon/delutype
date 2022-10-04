import { Dispatch, AnyAction } from "redux";

type HandleEndGame = {
    time: number;
    correctChar: number;
    errorChar: number;
    text: string;
    listOfRawWPM: number[];
    listOfWPM: number[];
    gazeCount: number;
    dispatch: Dispatch<AnyAction>;
    addGazeCount: (this: Window, arg1: Event) => any;
    setIsFocused: Function;
    setGazeCount: Function;
    setListenerActivated: Function;
    setRunning: Function;
    setTime: Function;
    resetTyping: Function;
};

export default HandleEndGame;
