import React, { useEffect, useState } from "react";
import { UserContext } from "../assets/Context/UserContext";
import { myApi } from "../api/api";
import { TokenContext } from "../assets/Context/TokenContext";
import ShowCard from "../components/Projects/ShowCard";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const { user, saveUser } = React.useContext(UserContext);
  const { token, saveToken } = React.useContext(TokenContext);

  const fetchData = async () => {
    try {
      const response = await myApi.get("/projects");
      if (response.status === 200) {
        setProjects(response.data.data);
        console.log(response);
      }
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
      <h1 className="text-2xl mt-4 font-semibold text-center">Projetos</h1>

      {/* Grid para exibir os cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {!filterProject || filterProject.length === 0 ? (
          <p className="col-span-full text-center">
            Nenhum projeto cadastrado no sistema
          </p>
        ) : (
          filterProject.map((project, index) => (
            <ShowCard key={index} data={project} />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
