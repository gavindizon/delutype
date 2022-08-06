/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";

import Script from "next/script";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Script src="/webgazer.js" strategy="beforeInteractive" />
            <Script src="/test.js" strategy="beforeInteractive" />
            <Script src="/theme.js" strategy="beforeInteractive" />
            <Component {...pageProps} />
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
