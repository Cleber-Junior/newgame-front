import React, { useState } from "react";

import { myApi } from "../api/api";

const Home = () => {
  const [data, setData] = useState({});

  try {
    myApi.get("showAllProject").then((response) => {
      setData(response.data);
    });
  } catch (error) {
    console.error("Erro ao buscar projetos", error);
  }

  return (
    <div>
      <h1>Projetos</h1>
      <div>
        {data.map((project) => (
          <div key={project.id}>
            <h2>{project.name}</h2>
            <p>{project.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
