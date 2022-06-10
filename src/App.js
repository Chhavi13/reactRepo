import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import './App.css';
import Router from './router/Router';
import Nav from './widgets/Nav'




function App() {

  return (
    <>
     
        <BrowserRouter>
          <Nav />
          <Router />
        </BrowserRouter>
     
    </>
  );
}

export default App;
