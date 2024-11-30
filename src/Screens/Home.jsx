import React, { useEffect, useState } from "react";
import { myApi } from "../api/api";
import ShowCard from "../components/Projects/ShowCard";
import Loading from "../components/Projects/Loading";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const fetchData = async () => {
    try {
      const response = await myApi.get("/projects");
      if (response.status === 200) {
        setProjects(response.data.data);
        setLoading(false);
        console.log(response);
      }
    } catch (error) {
      console.error("Erro ao buscar projetos", error);
      setLoading(false);
    }
  };

  const filterProject = projects.filter((project) => project.status === 1);

  console.log("projects", projects);

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

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
