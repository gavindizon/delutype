import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import useTyping from "react-typing-game-hook";

const TypingGame: FC<{ text: string }> = ({ text }) => {
    const [duration, setDuration] = useState(0);
    const [gazeCount, setGazeCount] = useState(0);
    const [isListenerActivated, setListenerActivated] = useState(false);
    const [isFocused, setIsFocused] = useState(false);
    const letterElements = useRef<HTMLDivElement>(null);

    const {
        states: { charsState, currIndex, phase, correctChar, errorChar, startTime, endTime },
        actions: { insertTyping, deleteTyping, resetTyping },
    } = useTyping(text, { skipCurrentWordOnSpace: false, pauseOnError: true });

    // set cursor
    const pos = useMemo(() => {
        if (currIndex !== -1 && letterElements.current) {
            let spanref: any = letterElements.current.children[currIndex];
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

    function addGazeCount() {
        setGazeCount((prev) => prev + 1);
    }

    // initialize webgazer
    useEffect(() => {
        webgazer.begin();

        return () => {
            webgazer.end();
        };
    }, []);

    //set WPM
    useEffect(() => {
        if (phase === 2 && endTime && startTime) {
            setDuration(Math.floor((endTime - startTime) / 1000));
            setRunning(false);
            window.removeEventListener("addGaze", addGazeCount);
        } else {
            setDuration(0);
        }
    }, [phase, startTime, endTime]);

    //handle key presses
    const handleKeyDown = (letter: string, control: boolean) => {
        if (letter === "Escape") {
            resetTyping();
        } else if (letter === "Backspace") {
            deleteTyping(control);
        } else if (letter.length === 1) {
            setRunning(true);
            insertTyping(letter);
            if (!isListenerActivated) {
                window.addEventListener("addGaze", addGazeCount);
                setListenerActivated(true);
            }
        }
    };

    //timer
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);

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

    return (
        <>
            <div
                tabIndex={0}
                onKeyDown={(e) => {
                    handleKeyDown(e.key, e.ctrlKey);
                    setRunning(true);
                }}
                //onFocus={() => setIsFocused(true)}
                //  onBlur={() => setIsFocused(false)}
                className="typing-test relative"
            >
                <div className="flex justify-between">
                    <p className="text-2xl pb-2">WPM: {Math.round(((60 / time) * correctChar) / 5) || 0}</p>
                    <p className="text-2xl pb-2">
                        <span>{("0" + Math.floor(time / 3600)).slice(-2)}:</span>
                        <span>{("0" + Math.floor((time / 60) % 60)).slice(-2)}:</span>
                        <span>{("0" + Math.floor(time % 60)).slice(-2)}</span>
                    </p>
                </div>
                <div
                    ref={letterElements}
                    className="tracking-wide px-1 pointer-events-none select-none mb-4 text-justify text-2xl"
                    tabIndex={0}
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
        </>
    );
};

export default TypingGame;
