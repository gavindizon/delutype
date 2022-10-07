type HandleKeyDown = {
    letter: string;
    control: boolean;
    timestamp: number;
    settings: any;
    isListenerActivated: boolean;
    setListenerActivated: Function;
    currentChar: string;
    currentWord: string;
    resetTyping: () => void;
    deleteTyping: (deleteWord?: boolean) => void;
    insertTyping: (char?: string) => void;
    setRunning: Function;
    setTypeLog: Function;
    addGaze: (this: Window, arg1: Event) => any;
    removeGaze: (this: Window, arg1: Event) => any;
};

export default HandleKeyDown;
