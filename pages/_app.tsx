/* eslint-disable @next/next/no-before-interactive-script-outside-document */
import "../styles/globals.scss";
import type { AppProps } from "next/app";
import Script from "next/script";
function MyApp({ Component, pageProps }: AppProps) {
    return (
        <>
            <Script src="/public/theme.js" strategy="beforeInteractive" />
            <Component {...pageProps} />
        </>
    );
}

export default MyApp;
