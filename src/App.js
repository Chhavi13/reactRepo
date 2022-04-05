import logo from './logo.svg';
import './App.css';
import List from './list';
import { DateTime } from './date&Time';
import Welcome from './ClassComponents/ClassComp';
import Fun from './FunctionalComponent/new';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header"> */}
      <List />
       <DateTime />


       <Welcome />
       <Fun name="eshita"/>
       <Fun name="harshita"/>
      {/* </header> */}
       
   
    </div>
  );
}

export default App;
