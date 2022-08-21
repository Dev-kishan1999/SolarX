import React, { createContext, useState } from "react";
export const AppData = createContext(null);

export const AppProvider = (props) => {
  const [data, setData] = useState(1);
  return (
    <AppData.Provider value={{ data, setData }}>
      {props.children}
    </AppData.Provider>
  );
};