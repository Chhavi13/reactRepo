import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter } from 'react-router-dom'
import Header from './Common/Header/Header';
import Footer from './Common/Footer/Footer';
import Routing from './Routes/Routing';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/dist/jquery.min.js'
import 'bootstrap/dist/js/bootstrap.min.js'

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <div className="page-inner-section">
          <Routing />
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
