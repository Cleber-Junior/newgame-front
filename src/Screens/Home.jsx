import React, { useEffect, useState } from "react";
import { UserContext } from "../assets/Context/UserContext";
import { myApi } from "../api/api";
import { TokenContext } from "../assets/Context/TokenContext";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const { user, saveUser } = React.useContext(UserContext);
  const { token, saveToken } = React.useContext(TokenContext);

  const fetchData = async () => {
    try {
      const response = await myApi.get("/projects");
      setProjects(response.data.data);
    } catch (error) {
      console.error("Erro ao buscar projetos", error);
    }
  };

  console.log("projects", projects);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <h1>Projetos</h1>
      <div style={{ background: "grey", width: "10%" }}>
        {!projects ? (
          <p>Nenhum projeto cadastrado no sistema</p>
        ) : (
          projects.map((project) => (
            <div key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </div>
          ))
        )}
      </div>
      {user && <p>Olá, {user.name}</p>}
    </div>
  );
};

export default Home;
