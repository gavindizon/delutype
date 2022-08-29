/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import { wrapper, store } from "../redux/store";
import { Provider } from "react-redux";
import NextNProgress from "nextjs-progressbar";

import Script from "next/script";
import { AuthProvider } from "../context/AuthContext";

function MyApp({ Component, pageProps }: AppProps) {
    return (
        <Provider store={store}>
            <Script src="/webgazer.min.js" strategy="beforeInteractive" />
            <Script src="/test.js" strategy="beforeInteractive" />
            <Script src="/theme.js" strategy="beforeInteractive" />
            
            <AuthProvider>
                <NextNProgress color="#00c49a" />
                <Component {...pageProps} />
            </AuthProvider>
        </Provider>
    );
}

export default wrapper.withRedux(MyApp);
