import React from "react";

export const ProjectContext = React.createContext();

export const ProjectStorage = ({ children }) => {
  const [projectData, setProjectData] = React.useState(() => {
    return JSON.parse(localStorage.getItem("projectData")) || null;
  });

  const saveProject = (newProject) => {
    setProjectData(newProject);
    localStorage.setItem("projectData", JSON.stringify(newProject));
  };

  React.useEffect(() => {
    if (projectData) {
      localStorage.setItem("projectData", JSON.stringify(projectData));
    } else {
      localStorage.removeItem("projectData");
    }
  }, [projectData]);

  return (
    <ProjectContext.Provider value={{ projectData, saveProject }}>
      {children}
    </ProjectContext.Provider>
  );
};
