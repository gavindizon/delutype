import variables from "../../styles/variables.module.scss";

const dark = {
    bg: {
        primary: variables.bgPrimaryDarkMode,
        secondary: variables.bgSecondaryDarkMode,
    },
    text: {
        primary: variables.txtPrimaryDarkMode,
        secondary: variables.txtSecondaryDarkMode,
        placeholder: variables.txtTertiaryDarkMode,
    },
    // ...
};

const light = {
    bg: {
        primary: variables.bgPrimaryLightMode,
        secondary: variables.bgSecondaryLightMode,
    },
    text: {
        primary: variables.txtPrimaryLightMode,
        secondary: variables.txtSecondaryLightMode,
        placeholder: variables.txtTertiaryLightMode,
    },
    // ...
};

const defaultTheme = {
    fontWeights: {
        body: 400,
        subheading: 500,
        link: 600,
        bold: 700,
        heading: 800,
    },
    lineHeights: {
        body: 1.5,
        heading: 1.3,
        code: 1.6,
    },
    text: {
        alt: variables.txtAlt,
    },
    // ...
};

export const lightTheme = { ...defaultTheme, ...light };
export const darkTheme = { ...defaultTheme, ...dark };
