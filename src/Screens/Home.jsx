import React, { useEffect, useState } from "react";
import { myApi } from "../api/api";
import ShowCard from "../components/Projects/Cards/ShowCard";
import Loading from "../components/Projects/Loading";
import Fuse from "fuse.js";

const Home = ({ search }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterProject, setFilterProject] = useState([]);

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

  useEffect(() => {
    if (search) {
      const fuse = new Fuse(projects, {
        keys: ["name"],
        threshold: 0.3,
      });
      const result = fuse.search(search);
      setFilterProject(
        result.map((item) => item.item).filter((item) => item.status === 1)
      );
    } else {
      setFilterProject(
        projects.map((item) => item).filter((item) => item.status === 1)
      );
    }
  }, [search, projects]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    setFilterProject(
      projects.map((item) => item).filter((item) => item.status === 1)
    );
  }, [projects]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="font-outfit">
      <h1 className="text-2xl mt-4 font-semibold text-center">Projetos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filterProject.length > 0
          ? filterProject.map((project, index) => (
              <ShowCard key={index} data={project} />
            ))
          : "Nenhum projeto encontrado"}
      </div>
    </div>
  );
};

export default Home;

// {
//   !filterProject ? (
//     <p>Nenhum projeto cadastrado no sistema</p>
//   ) : (
//     filterProject.map((project, index) => (
//       <ShowCard key={index} data={project} />
//     ))
//   );
// }
