import React from 'react';
import './App.css';
import PostView from './features/post/PostView';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import ViewPostDetails from './features/post/ViewPostDetails';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< PostView />}></Route>
          <Route path='/viewpostdetails/:id' element={<ViewPostDetails/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
