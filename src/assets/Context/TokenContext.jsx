import React, {useState, useEffect} from "react";

export const TokenContext = React.createContext();

export const TokenStorage = ({ children }) => {
  const [token, setToken] = useState(() => {
    return localStorage.getItem("token") || null;
  });

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("token", newToken);
  }

  useEffect(() => {
    if(token) {
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem("token");
    }
  }, [token])

  return (
    <TokenContext.Provider value={{saveToken, token}}>
      {children}
    </TokenContext.Provider>
  );
};
