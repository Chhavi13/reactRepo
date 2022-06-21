import React from 'react';
import logo from './logo.svg';

import './App.css';
// import { UserView } from './features/user/userView';
import { UserTable } from './features/user/UserTable';
import { PostView } from './features/post/postView';
import Search from './component/Search';


function App() {
  return (
    <div className="App">
     
      {/* <UserView /> */}
      {/* <UserTable /> */}
      {/* <Search /><br></br> */}
      <PostView />
    </div>
  );
}

export default App;
