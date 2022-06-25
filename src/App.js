import React from 'react';
import logo from './logo.svg';
import './App.css';
// import { UserView } from './features/user/userView';
import { UserTable } from './features/user/UserTable';
import { PostView } from './features/post/postView';
import CardContainer from './container/cardContainer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={< PostView />}></Route>
          {/* <Route path='/viewdetails/:id' element={<Viewdetails/>}></Route> */}
        </Routes>
      </BrowserRouter>
      {/* <CardContainer /> */}
    </div>
  );
}

export default App;










{/* <UserView /> */ }
{/* <UserTable /> */ }
{/* <Search /><br></br> */ }