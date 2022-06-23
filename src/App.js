import React from 'react';
import logo from './logo.svg';

import './App.css';
// import { UserView } from './features/user/userView';
import { UserTable } from './features/user/UserTable';
import { PostView } from './features/post/postView';
import Search from './component/Search';
import CardContainer from './container/cardContainer';


function App() {
  return (
    <div className="App">
     
      {/* <UserView /> */}
      {/* <UserTable /> */}
      {/* <Search /><br></br> */}
      {/* <PostView /> */}
      <CardContainer/>
    </div>
  );
}

export default App;
