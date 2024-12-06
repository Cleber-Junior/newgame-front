import React, { useState, useEffect } from "react";
import { myApi } from "../../api/api";
import { TokenContext } from "./TokenContext";

export const UserContext = React.createContext();

export const UserStorage = ({ children }) => {
  const { token } = React.useContext(TokenContext);
  const [user, setUser] = useState(() => {
    return JSON.parse(localStorage.getItem("user")) || null;
  });

  const saveUser = (newUser) => {
    setUser(newUser);
    localStorage.setItem("user", JSON.stringify(newUser));
  };

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const handleSave = async (e, userData) => {
    e.preventDefault();
    console.log("token", token);
    console.log("userData", userData);

    try {
      const response = await myApi.post(`/editUser/${user.id}`, userData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
          const data = response.data
          saveUser(data.user);
          const message = data.msg;
          const datas = {
            message: message,
            user: data.user
          }

          return datas;
        }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <UserContext.Provider value={{ saveUser, user, handleSave }}>
      {children}
    </UserContext.Provider>
  );
};
