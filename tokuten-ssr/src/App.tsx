import './App.css';
import React from "react"
import { Layout } from "./container";
import { Helmet } from 'react-helmet-async';


function App() {
  return (
    <div>
      <Helmet>
        <meta property="og:title" content="Tokuten | For investors, traders & collectors" />
        <link rel="icon" href="https://tokuten.co/logo.png" />
        {/* <meta property="fb:app_id" content="1823086727864409" /> */}
        <meta property="og:image" content="https://tokuten.co/logo.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:description" content="Discover ideas, tune into live trading sessions or chat about everything from - stocks to rare watches, wine and art to crypto and NFT. Build and manage your own community. Create, share and monetise your own content." />
        <link rel="apple-touch-icon" href="https://tokuten.co/logo.png" />
        <link rel="apple-touch-icon" href="https://tokuten.co/logo.png" />
        <meta property="og:url" content="https://tokuten.co" />
      </Helmet>
      {/* // <AppProvider> */}
      <Layout />
      {/* // </AppProvider> */}
    </div>

  );
}

export default App;