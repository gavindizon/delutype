import salvoLayout from "../../../data/salvoLayout.json";
import dvorakLayout from "../../../data/dvorakLayout.json";
import HandleKeyDown from "../types/HandleKeyDown";

const handleKeyDown = ({
    letter,
    control,
    settings,
    isListenerActivated,
    setListenerActivated,
    resetTyping,
    deleteTyping,
    setRunning,
    insertTyping,
    setTypeLog,
    timestamp,
    currentChar,
    currentWord,
    addGaze,
    removeGaze,
}: HandleKeyDown) => {
    if (letter?.length === 1) {
        if (settings.layout === "Salvo") {
            letter = salvoLayout[letter as keyof typeof salvoLayout] || letter;
        } else if (settings.layout === "Dvorak") {
            letter = dvorakLayout[letter as keyof typeof salvoLayout] || letter;
        }
    }

    if (letter === "Escape") {
        resetTyping();
    } else if (letter === "Backspace") {
        deleteTyping(control);
    } else if (letter.length === 1) {
        setRunning(true);
        insertTyping(letter);

        setTypeLog((typeLog: any) => [
            ...typeLog,
            {
                timestamp,
                currentChar,
                currentWord,
                actualChar: letter,
                hasCorrectInput: currentChar === letter,
            },
        ]);

        if (!isListenerActivated) {
            window.addEventListener("addGaze", addGaze);
            window.addEventListener("removeGaze", removeGaze);
            setListenerActivated(true);
        }
    }
};
export default handleKeyDown;
