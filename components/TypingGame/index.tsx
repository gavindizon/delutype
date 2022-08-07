import React, { FC, useEffect, useMemo, useRef, useState } from "react";
import useTyping from "react-typing-game-hook";

const TypingGame: FC<{ text: string }> = ({ text }) => {
    const [duration, setDuration] = useState(0);
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

    //set WPM
    useEffect(() => {
        if (phase === 2 && endTime && startTime) {
            setDuration(Math.floor((endTime - startTime) / 1000));
        } else {
            setDuration(0);
        }
    }, [phase, startTime, endTime]);

    //handle key presses
    const handleKeyDown = (letter: string, control: boolean) => {
        console.log(letter);
        if (letter === "Escape") {
            resetTyping();
        } else if (letter === "Backspace") {
            deleteTyping(control);
        } else if (letter.length === 1) {
            insertTyping(letter);
        }
    };

    return (
        <>
            <div
                tabIndex={0}
                onKeyDown={(e) => handleKeyDown(e.key, e.ctrlKey)}
                //onFocus={() => setIsFocused(true)}
                //  onBlur={() => setIsFocused(false)}
                className="typing-test relative"
            >
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
            <p className="text-sm">
                {phase === 2 && startTime && endTime ? (
                    <>
                        <span className="text-green-500 mr-4">
                            WPM: {Math.round(((60 / duration) * correctChar) / 5)}
                        </span>
                        <span className="text-blue-500 mr-4">
                            Accuracy: {((correctChar / text.length) * 100).toFixed(2)}%
                        </span>
                        <span className="text-yellow-500 mr-4">Duration: {duration}s</span>
                    </>
                ) : null}
                <span className="mr-4"> Current Index: {currIndex}</span>
                <span className="mr-4"> Correct Characters: {correctChar}</span>
                <span className="mr-4"> Error Characters: {errorChar}</span>
            </p>
        </>
    );
};

export default TypingGame;
