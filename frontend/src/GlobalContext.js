
import React, { createContext, useState } from 'react';

const GlobalContext = createContext()

//provider for the context
export const GlobalProvider = ({ children }) => {
  const [profile, setProfile] = useState({ username: null, email: null, userId: null});


  return (
    <GlobalContext.Provider value={{ profile, setProfile }}>
      {children}
    </GlobalContext.Provider>
  );
};

