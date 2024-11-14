import React, { createContext, useState, useContext } from "react";
import { myApi } from "../../api/api";

export const FecthContext = React.createContext();

export const FetchProvider = ({ children }) => {
  const [projectData, setProjectData] = useState({});

  const fetchProjectData = async (id) => {
    try {
      const response = await myApi.get(`/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setProjectData(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <FecthContext.Provider
      value={{ projectData, fetchProjectData }}
    >
      {children}
    </FecthContext.Provider>
  );
};
