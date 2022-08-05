import React from 'react';
import Routes from "../routes/routes" 

const Content = () => {
  return (
    <Routes />
  )
}

export const Layout = () => {
  return (
    <div className="App">
      {/* <Header /> */}
      <main>{ Content() }</main>
      {/* <Tabs /> */}
    </div>
  )
}

