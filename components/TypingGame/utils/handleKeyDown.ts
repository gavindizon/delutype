import salvoLayout from "../../../data/salvoLayout.json";
import dvorakLayout from "../../../data/dvorakLayout.json";
import HandleKeyDown from "../types/HandleKeyDown";

const handleKeyDown = ({
    letter,
    control,
    settings,
    isListenerActivated,
    setListenerActivated,
    addGazeCount,
    resetTyping,
    deleteTyping,
    setRunning,
    insertTyping,
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
        console.log(letter, "HELLO");
        insertTyping(letter);
        if (!isListenerActivated) {
            window.addEventListener("addGaze", addGazeCount);
            setListenerActivated(true);
        }
    }
};
export default handleKeyDown;
