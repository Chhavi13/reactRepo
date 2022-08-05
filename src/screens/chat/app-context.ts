// import React, { useState, useContext, createContext } from 'react';

// const defaultInitialState = { channels: [], updateChannels: () => {} };

// const AppContext = createContext(defaultInitialState);

// export function useApp() {
//   return useContext(AppContext);
// }

// export function AppProvider({ children }) {
//   const [channels, setChannels] = useState([]);
//   return <AppContext.Provider value={{ channels, updateChannels: setChannels }}>{children}</AppContext.Provider>;
// }

import { createContext, useContext } from "react";

export type GlobalContent = {
  channels: any
  updateChannels:(c: any) => void
}
export const MyGlobalContext = createContext<GlobalContent>({
  channels: [], // set a default value
  updateChannels: () => {},
})
export const useGlobalContext = () => useContext(MyGlobalContext)