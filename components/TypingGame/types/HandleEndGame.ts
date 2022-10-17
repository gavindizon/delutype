import { Dispatch, AnyAction } from "redux";
import GazeData from "./GazeData";

type HandleEndGame = {
    time: number;
    correctChar: number;
    errorChar: number;
    text: string;
    listOfRawWPM: number[];
    listOfWPM: number[];
    gazeCount: number;
    gazeUpLog: GazeData[];
    gazeDownLog: GazeData[];
    typeLog: any;
    settings: Object;
    dispatch: Dispatch<AnyAction>;
    addGaze: (this: Window, arg1: Event) => any;
    removeGaze: (this: Window, arg1: Event) => any;
    setIsFocused: Function;
    setGazeCount: Function;
    setListenerActivated: Function;
    setRunning: Function;
    setTime: Function;
    resetTyping: Function;
};

export default HandleEndGame;
