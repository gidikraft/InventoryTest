import React, { createContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [isAuthenticated, setisAuthenticated] = useState(false);
  const [userName, setUserName] = useState("");

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        setisAuthenticated,
        userName,
        setUserName,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppContextProvider };
