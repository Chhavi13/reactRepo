import React, { useEffect, useContext, useReducer, createContext } from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import { initialState, reducer } from './reducer/reducer';
import Router from './router/Router';
import Nav from './widgets/Nav'

export const UserContext = createContext();


function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  return (
    <>
      <UserContext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          <Nav />
          <Router />
        </BrowserRouter>
      </UserContext.Provider>
    </>
  );
}

export default App;
