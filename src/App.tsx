import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import AddTodo from './component/todos/AddTodo';
import TodoList from './component/todos/TodoList';
import { Icon } from '@mui/material';
import { green } from '@mui/material/colors';
import ResponsiveAppBar from './component/header/Navbar';

function App() {

  
  return (
    <div className="App">
    
      <BrowserRouter>
      <ResponsiveAppBar />
        <Routes>
          <Route path='/' element={< TodoList />}></Route>
          <Route path='/addtodo' element={< AddTodo />}></Route>

        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
