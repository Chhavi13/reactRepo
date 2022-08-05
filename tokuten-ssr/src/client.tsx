import React from 'react';
import { hydrate } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { HelmetProvider } from "react-helmet-async";
import configureStore from "./redux/Store/store"
import App from './App';
import { Hydrate, QueryClient, QueryClientProvider } from "react-query";

declare var window: any;
const dehydratedState = window.__REACT_QUERY_STATE__;
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      suspense: true
    }
  }
});


const store: any = configureStore(window.__PRELOADED_STATE__);

hydrate(
  <QueryClientProvider client={queryClient}>
    <Hydrate state={dehydratedState}>
      <Provider store={store}>
        <BrowserRouter>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </Provider>
    </Hydrate>
  </QueryClientProvider>
  ,
  document.getElementById('root')
);

if (module.hot) {
  module.hot.accept();
}