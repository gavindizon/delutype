import React, { useEffect } from "react";
import { ThemeProvider } from "styled-components";
import useDarkMode from "use-dark-mode";

import { darkTheme, lightTheme } from "./Theme/index";

type Props = {
    children: JSX.Element;
};

const Providers: React.FC<Props> = ({ children }) => {
    const { value, toggle } = useDarkMode(true);

    const theme = value ? darkTheme : lightTheme;

    const [mounted, setMounted] = React.useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const body = <ThemeProvider theme={theme}>{children}</ThemeProvider>;

    if (!mounted) {
        //eslint-disable-next-line
        return <div style={{ visibility: "hidden" }}>{body}</div>;
    }

    return body;
};

export default Providers;
