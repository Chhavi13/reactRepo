
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../Reducer/rootReducer/rootReducer';


import {createStore, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
//  import browserHistory from 'history/createBrowserHistory';
import {persistStore, persistReducer} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const browserHistory =require("history").createBrowserHistory


const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['authReducer'], // which reducer want to store
    // blacklist: ['']  // which reducer do not want to store
  };

const persistedReducer = persistReducer (persistConfig, rootReducer);

const store = createStore (persistedReducer,composeWithDevTools( applyMiddleware(thunk)));
export const persistor = persistStore (store);
 export const history = browserHistory();
export default store;