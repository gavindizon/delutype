type HandleKeyDown = {
    letter: string;
    control: boolean;
    settings: any;
    isListenerActivated: boolean;
    setListenerActivated: Function;
    resetTyping: () => void;
    deleteTyping: (deleteWord?: boolean) => void;
    insertTyping: (char?: string) => void;
    setRunning: Function;
    addGazeCount: (this: Window, arg1: Event) => any;
};

export default HandleKeyDown;
