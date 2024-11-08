import React, { useEffect, useState } from "react";
import { UserContext } from "../assets/Context/UserContext";
import { myApi } from "../api/api";
import { TokenContext } from "../assets/Context/TokenContext";
import Card from "../components/Projects/Card";

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

  const filterProject = projects.filter((project) => project.status === 1);

  console.log("projects", projects);

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="font-outfit">
      <h1>Projetos</h1>
      <div className="bg-gray-400 text-black w-24">
        {!filterProject ? (
          <p>Nenhum projeto cadastrado no sistema</p>
        ) : (
          filterProject.map((project, index) => (
            <Card key={index} data={project} />
          ))
        )}
      </div>
      {user && <p>Olá, {user.name}</p>}
    </div>
  );
};

export default Home;
