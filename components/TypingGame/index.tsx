import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import useTyping from "react-typing-game-hook";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../../hooks/useAuth";
import { handleEndGame } from "./services/handleEndGame";
import assignKeyboard from "./utils/assignKeyboard";
import handleKeyDown from "./utils/handleKeyDown";
import getWord from "./utils/getWord";
import GazeData from "./types/GazeData";

const TypingGame: FC<{ text: string }> = ({ text = "" }) => {
    const { settings } = useSelector((state: any) => state);
    const dispatch = useDispatch();
    const { user } = useAuth();
    const letterElements = useRef<HTMLDivElement>(null);
    const {
        states: { charsState, currIndex, phase, correctChar, errorChar, startTime, endTime },
        actions: { insertTyping, deleteTyping, resetTyping },
    } = useTyping(text, { skipCurrentWordOnSpace: false, pauseOnError: true });

    const [gazeCount, setGazeCount] = useState(0);
    const [isListenerActivated, setListenerActivated] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const [time, setTime] = useState(0);
    const [heightAdjust, setHeightAdjust] = useState(0);
    const [running, setRunning] = useState(false);
    const [listOfRawWPM, setListOfRawWPM] = useState<number[]>([]);
    const [listOfWPM, setListOfWPM] = useState<number[]>([]);
    const [currentChar, setCurrentChar] = useState(text[0]);
    const [currentWord, setCurrentWord] = useState(text.split(" ")[0]);
    const [typeLog, setTypeLog] = useState<any>([]);
    const [gazeDownLog, setGazeDownLog] = useState<any>([]);
    const [gazeUpLog, setGazeUpLog] = useState<any>([]);
    const [gazeStatus, setGazeStatus] = useState<"up" | "down" | "">("");

    function addGaze() {
        setGazeCount((prev) => prev + 1);

        if (gazeStatus !== "down") setGazeStatus("down");
    }

    function removeGaze() {
        if (gazeStatus !== "up") setGazeStatus("up");
    }

    // set cursor
    const pos = useMemo(() => {
        if (currIndex !== -1 && letterElements.current) {
            let spanref: any = letterElements.current.children[0].children[currIndex];
            let left = spanref.offsetLeft + spanref.offsetWidth - 1;
            let top = spanref.offsetTop;
            return { left, top };
        } else {
            return {
                left: 0,
                top: 2,
            };
        }
    }, [currIndex]);

    useEffect(() => {
        switch (gazeStatus) {
            case "up":
                setGazeUpLog((prev: GazeData[]) => [
                    ...prev,
                    {
                        timestamp: startTime ? new Date().getTime() - startTime : 0,
                        currentChar,
                        currentWord,
                    },
                ]);
                break;
            case "down":
                setGazeDownLog((prev: GazeData[]) => [
                    ...prev,
                    {
                        timestamp: startTime ? new Date().getTime() - startTime : 0,
                        currentChar,
                        currentWord,
                    },
                ]);
                break;
        }

        //eslint-disable-next-line
    }, [gazeStatus]);

    useEffect(() => {
        setCurrentChar(text[0]);
        setCurrentWord(text.split(" ")[0]);
    }, [text]);

    // initialize webgazer
    useEffect(() => {
        if (user && !user?.isProfileUnfinished) {
            webgazer.begin();

            if (document) {
                setTimeout(function () {
                    let dot: HTMLElement | null = document.querySelector("#webgazerGazeDot");
                    if (dot) dot.style.opacity = "0.1";
                }, 4500);
            }

            assignKeyboard(dispatch);

            dispatch({
                type: "OPEN_MODAL",
                payload: {
                    type: "NOTIFICATION",
                    title: `Start Test`,
                    description: `Your task is to type the text using the ${settings.layout} layout. Click on the text and start typing to begin the test`,
                },
            });
        }

        return () => {
            if (user && !user?.isProfileUnfinished) webgazer?.end();
        };

        //eslint-disable-next-line
    }, []);

    useEffect(() => {
        if (phase === 2 && endTime && startTime) {
            handleEndGame({
                time,
                correctChar,
                errorChar,
                text,
                listOfRawWPM,
                listOfWPM,
                gazeCount,
                typeLog,
                gazeUpLog,
                gazeDownLog,
                settings,
                dispatch,
                addGaze,
                removeGaze,
                setRunning,
                resetTyping,
                setTime,
                setGazeCount,
                setIsFocused,
                setListenerActivated,
            });
        }

        //eslint-disable-next-line
    }, [phase, startTime, endTime]);

    //pushes actual WPM and raw WPM values to WPM states
    useEffect(() => {
        var rawWPM = ((60 / time) * (correctChar + errorChar)) / 5 || 0;
        var actualWPM = ((60 / time) * correctChar) / 5 || 0;
        setListOfRawWPM((prevList) => [...prevList, rawWPM !== NaN ? rawWPM : 0]);
        setListOfWPM((prevList) => [...prevList, actualWPM !== NaN ? actualWPM : 0]);

        //eslint-disable-next-line
    }, [time]);

    useEffect(() => {
        let interval: any;
        if (running) {
            interval = setInterval(() => {
                setTime((prevTime) => prevTime + 1);
            }, 1000);
        } else if (!running) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [running]);

    useEffect(() => {
        if (pos.top > 72) {
            setHeightAdjust(heightAdjust + 1);
        }

        //eslint-disable-next-line
    }, [pos.top]);

    useEffect(() => {
        setCurrentChar(text[(currIndex + 1) % text.length]);
        setCurrentWord(getWord(text, currIndex));
        //eslint-disable-next-line
    }, [currIndex]);

    return (
        <>
            <div
                tabIndex={0}
                onKeyDown={(e) => {
                    e.preventDefault();

                    handleKeyDown({
                        letter: e.key,
                        control: e.ctrlKey,
                        settings,
                        isListenerActivated,
                        setListenerActivated,
                        addGaze,
                        removeGaze,
                        resetTyping,
                        deleteTyping,
                        setRunning,
                        insertTyping,
                        setTypeLog,
                        currentChar,
                        currentWord,
                        timestamp: startTime ? new Date().getTime() - (startTime as number) : 0,
                    });
                    setRunning(true);
                }}
                onFocus={() => setIsFocused(true)}
                //  onBlur={() => setIsFocused(false)}
                className="typing-test relative"
            >
                <div className="flex justify-between mb-4">
                   
                    {settings?.showWPM.length !== 0 ? (
                        <p className={`text-2xl pb-2`}>WPM: {Math.round(((60 / time) * correctChar) / 5) || 0}</p>
                    ) : (
                        <div>&nbsp;</div>
                    )}
                    
                    <p className="text-2xl pb-2">
                        <span>{("0" + Math.floor(time / 3600)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
                    </p>
                </div>
                <div
                    ref={letterElements}
                    className="tracking-wide px-1 pointer-events-none select-none mb-4 text-justify text-2xl h-64 overflow-hidden"
                    tabIndex={-1}
                >
                    <div
                        style={{
                            marginTop: String(-16 * heightAdjust) + "px",
                        }}
                    >
                        {text.split("").map((letter, index) => {
                            let state = charsState[index];
                            let color = state === 0 ? "text-gray-700" : state === 1 ? "text-gray-400" : "text-red-500";
                            return (
                                <span key={letter + index} className={`${color}`}>
                                    {letter}
                                </span>
                            );
                        })}
                    </div>
                </div>
                {phase !== 2 && isFocused ? (
                    <span
                        style={{
                            left: pos.left,
                            top: pos.top,
                        }}
                        className={`caret border-l-2 border-white`}
                    >
                        &nbsp;
                    </span>
                ) : null}
            </div>
            <p className="text-sm">{running ? gazeCount : 0}</p>
            <p className="text-sm">
                {currentChar} | {currentWord}
            </p>
        </>
    );
};

export default TypingGame;
