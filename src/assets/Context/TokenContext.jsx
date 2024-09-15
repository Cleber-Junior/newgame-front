import React, {useState} from "react";

export const TokenContext = React.createContext();

export const TokenStorage = ({ children }) => {
  const [token, setToken] = useState(null);

  const saveToken = (newToken) => {
    setToken(newToken);
  }

  return (
    <TokenContext.Provider value={{saveToken, token}}>
      {children}
    </TokenContext.Provider>
  );
};
