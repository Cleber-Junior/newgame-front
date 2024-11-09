import React from "react";
import { useLocation } from "react-router-dom";

const editProject = () => {
  const location = useLocation();
  const projectId = location.state?.projectId;
  console.log(projectId);
  return <div>Edita Projeto</div>;
};

export default editProject;
