import React, { useEffect, useState } from "react";
import { myApi } from "../api/api";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await myApi.get("/showAllProject");
        setData(response.data);
      } catch (error) {
        console.error("Erro ao buscar projetos", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Projetos</h1>
      <div style={{ background: "grey", width: "10%" }}>
        {data.length === 0 ? (
          <p>Nenhum projeto cadastrado no sistema</p>
        ) : (
          data.map((project) => (
            <div key={project.id}>
              <h2>{project.name}</h2>
              <p>{project.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
