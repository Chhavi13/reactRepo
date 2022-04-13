import { BrowserRouter,Routes, Route } from 'react-router-dom'
import './App.css';
import { DateTime } from './date&Time';
import Welcome from './ClassComponents/ClassComp';
import Fun from './FunctionalComponent/new';
import UseStateExample from './FunctionalComponent/useStateExample';
import Practice from './ClassComponents/practice';
import Test from './FunctionalComponent/Test';

import Practice2 from './FunctionalComponent/practice2';
import Parent from './ClassComponents/Parent';
import ConditionalRendering from './FunctionalComponent/conditionalRendering';
import GetUserDataList from './FunctionalComponent/getUserDataList';
import List from './FunctionalComponent/list';
import Stylesheets from './FunctionalComponent/Stylesheets';
import Router from './Router/router';

function App() {
  let data = "chhavi cho"
  let apple = () => {
    alert("fuction called")
    console.log("called")
  }

  return (
    <>
      {/* <header className="App-header"> */}
      {/* <List />
      <DateTime /> */}
      <BrowserRouter>
     <Router />
      
      </BrowserRouter>

      {/* <Welcome  name="purva"/>
       <Fun name="eshita" />
       <Fun name="harshita" bday="today"/>
  */}
      {/* <h1>{data}</h1> */}
      {/* <UseStateExample />

       <Practice></Practice> 
{/* 
       <Test /> */}

      {/* <Practice></Practice>  */}

      {/* <button onClick={apple}>click me</button>
        <button onClick={()=>alert("my fun called")}>submit</button> */}
      {/* <Practice2 /><br></br>
      <Parent /> */}


      {/* <ConditionalRendering /> */}

      {/* <List /> */}


      {/* <Hideandshow />
    <GetUserDataList /> */}
      {/* </header> */}

      {/* <Stylesheets primary={false}/> */}
    </>
  );
}

export default App;
