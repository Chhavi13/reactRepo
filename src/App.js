import logo from './logo.svg';
import './App.css';
import { CakeView } from './features/cake/CakeView';
import { IcecreameView } from './features/icecreame/IceCreameView';
import { UserView } from './features/users/UserView';

function App() {
  return (
    <div style={{marginLeft:"40%"}} >
      <CakeView />
      <IcecreameView />
      <UserView />
    </div>
  );
}

export default App;
