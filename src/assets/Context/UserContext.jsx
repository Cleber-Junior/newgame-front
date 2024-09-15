import React from "react";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const [user, setUser] = React.useState(null);

  const saveUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <UserContext.Provider value={{ saveUser, user }}>
      {children}
    </UserContext.Provider>
  );
};
