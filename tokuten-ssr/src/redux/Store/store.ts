import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
// import rootReducer from './reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../Reducer/rootReducer/rootReducer';


const configureStore = (preloadedState:any) => {
  const store = createStore(
    rootReducer,
    preloadedState,
    composeWithDevTools(applyMiddleware(thunk))
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../Reducer/rootReducer/rootReducer', () => {
      const nextRootReducer = require('../Reducer/rootReducer/rootReducer').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};

export default configureStore;