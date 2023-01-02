import React from "react";
import Head from "next/head";
import ReactModal from "react-modal";
import Router from "next/router";
import NProgress from "nprogress";
import { AppProps } from "next/app";

import "../styles/globals.css";
import "nprogress/nprogress.css";
import { WebSocketProvider } from "../modules/ws/WebSocketProvider";
import { PageComponent } from "../types/PageComponent";
import { isServer } from "../lib/isServer";

Router.events.on("routeChangeStart", () => {
  NProgress.start();
});
Router.events.on("routeChangeComplete", () => NProgress.done());
Router.events.on("routeChangeError", () => NProgress.done());

ReactModal.setAppElement("#__next");

export default function MyApp({ Component, pageProps }: AppProps) {
  if (
    isServer &&
    !Component.getInitialProps &&
    (Component as PageComponent<unknown>).ws
  ) {
    return null;
  }

  return (
    <WebSocketProvider
      shouldConnect={!!(Component as PageComponent<unknown>).ws}
    >
      <Head>
        <link rel="icon" href="/reall_logo.svg" type="image/svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, user-scalable=no, user-scalable=0"
        />
      </Head>
      <Component {...pageProps} />
    </WebSocketProvider>
  );
}
