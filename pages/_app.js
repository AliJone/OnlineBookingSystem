import Head from "next/head";
import "antd/dist/antd.css";
import "../styles/global.css";
import React from "react";
import { AppProvider } from "../utils/store";

function MyApp({ Component, pageProps }) {
  const Layout = Component.layout || (({ children }) => <>{children}</>);
  console.log("Component", Component);

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <title>Book Better</title>
      </Head>
      <AppProvider>
      <Layout>

      <Component {...pageProps} />
      </Layout>
      </AppProvider>
    </>
  );
}

export default MyApp;
