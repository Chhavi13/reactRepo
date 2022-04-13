import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(

  <App />

  ,
  document.getElementById('root')
);

//we can use [] in render method instaed of div  for multiple jsx element ke liye 
//but div inside div problem create krta hai so we can use  React.Fragment usekree
//we can use special fregmnt syntactical sugar for fregment <></> instead of React fragment 