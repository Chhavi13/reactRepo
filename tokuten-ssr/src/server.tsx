import App from "./App";
import React from "react";
import express from "express";
import { renderToString } from "react-dom/server";
import ssrPrepass from "react-ssr-prepass";
import { Provider } from 'react-redux';
import { StaticRouter } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
// import configureStore from './redux/store/store';
import configureStore from "./redux/Store/store"
import 'localstorage-polyfill';
import {
  dehydrate,
  Hydrate,
  QueryClient,
  QueryClientProvider
} from "react-query";
console.log("console log 2")
// import {window} from 'global';
require("global/window")
var env: any = process.env

const preloadedState = {};
const store = configureStore(preloadedState);
const finalState = store.getState();
global['localStorage'] = localStorage;
global['window'] = global.window;
const assets:any = require(env.RAZZLE_ASSETS_MANIFEST);
const path = ""

const paths = require("path")

const cssLinksFromAssets = (public_path:any, assets:any, entrypoint:any) => {
  return assets[entrypoint]
    ? assets[entrypoint].css
      ? assets[entrypoint].css
        .map(
          (asset:any) => `<link rel="stylesheet" href="${path}${asset}">`
        )
        .join("")
      : ""
    : "";
};

const jsScriptTagsFromAssets = (
  public_path:any,
  assets:any,
  entrypoint:any,
  extra = ""
) => {
  return assets[entrypoint]
    ? assets[entrypoint].js
      ? assets[entrypoint].js
        .map(
          (asset:any) => `<script crossorigin src="${path}${asset}"${extra}></script>`
        )
        .join("")
      : ""
    : "";
};

const server = express();

export const renderApp = async (req:any, res:any) => {
  try {
    const public_path = "https://35.239.121.228/";

    const context = {};
    const helmetContext: any = {};
    const queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          suspense: true
        }
      }
    });
    let dehydratedState = dehydrate(queryClient);

    const PrepassedApp = (

      <QueryClientProvider client={queryClient}>
        <Hydrate state={dehydratedState}>
          <Provider store={store}>
            <StaticRouter context={context} location={req.url}>
              <HelmetProvider context={helmetContext}>
                <App />
              </HelmetProvider>
            </StaticRouter>
          </Provider>
        </Hydrate>
      </QueryClientProvider>
    );
    await ssrPrepass(PrepassedApp);

    dehydratedState = dehydrate(queryClient);

    const markup = renderToString(PrepassedApp);
    const { helmet } = helmetContext;

    const html = `<!doctype html>
  <html lang="">
  <head>
  
  ${helmet.title.toString()}
  ${helmet.priority.toString()}
  ${helmet.meta.toString()}
  ${helmet.link.toString()}
  ${helmet.script.toString()}
  <!-- link for image slider -->
  
  <link rel="stylesheet" type="text/css" charset="UTF-8"
    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
  <link rel="stylesheet" type="text/css"
    href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
  
  <link rel="preconnect" href="https://fonts.gstatic.com">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@100;300;400;600;700;800;900&display=swap"
    rel="stylesheet">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
  <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css"
  />

  <meta name="viewport" content="width=device-width, initial-scale=1">
  ${cssLinksFromAssets(public_path, assets, "client")}
  <script crossorigin type="text/javascript">
    window.PUBLIC_PATH = '${public_path}';
  </script>
  </head>
  <body>
  <div id="root">${markup}</div>
  ${jsScriptTagsFromAssets(
      public_path,
      assets,
      "client",
      "defer",
      // "crossorigin"
    )}
    <script>
    crossorigin 
    window.__REACT_QUERY_STATE__ = ${await JSON.stringify(dehydratedState)};
    </script>
    </body>
    </html>`;
    return { context, html };

  } catch (error) {
    throw error;
    console.log(error)
  }
};

server
  .disable("x-powered-by")
  .use(express.static(env.RAZZLE_PUBLIC_DIR))
  .get("/*", async (req, res) => {
    const { html, context }: any = await renderApp(req, res);

    if (context.url) {
      // Somewhere a `<Redirect>` was rendered
      return res.redirect(301, context.url);
    }

    res.send(html);
  });

  server.use(express.static(paths.join(__dirname, '../../build'))); 
server.use(express.static(paths.join(__dirname, 'public')));

export default server;