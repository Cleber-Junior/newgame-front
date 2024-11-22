import React, { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FecthContext } from "../../assets/Context/FetchContext";

const MenuProjects = ({ project }) => {
  const location = useLocation();
  console.log(project);
  const { projectData, fetchProjectData } = React.useContext(FecthContext);

  useEffect(() => {
    if (project.id) {
      fetchProjectData(project.id);
    }
  }, []);

  console.log(projectData);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden w-60 bg-header-bg text-white p-4">
      <div className="flex flex-col items-center mb-6">
        {projectData.url ? (
          <>
            <img
              src={projectData.url} // Substitua pela URL correta da imagem do projeto
              alt="Projeto"
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h2 className="text-sm font-semibold text-center">
              {project.name}
            </h2>
          </>
        ) : (
          <>
            <h1>Nenhuma Imagem Selecionada</h1>
          </>
        )}
      </div>

      <Link
        to="../edit/name"
        state={{ project: project }}
        className={`py-3 px-4 mb-1 ${
          location.pathname === "/project/edit/name"
            ? "bg-green-700"
            : "bg-gray-800"
        } hover:bg-gray-700 transition rounded`}
      >
        Básico
      </Link>
      <Link
        to="../edit/finance"
        state={{ project: project }}
        className={`py-3 px-4 mb-1 ${
          location.pathname === "/project/edit/finance"
            ? "bg-green-700"
            : "bg-gray-800"
        } hover:bg-gray-700 transition rounded`}
      >
        Financiamento
      </Link>
      <Link
        to="../edit/description"
        state={{ project: project }}
        className={`py-3 px-4 mb-1 ${
          location.pathname === "/project/edit/description"
            ? "bg-green-700"
            : "bg-gray-800"
        } hover:bg-gray-700 transition rounded`}
      >
        Descrição
      </Link>
      <Link
        to=""
        state={{ project: project }}
        className="py-3 px-4 mb-1 bg-gray-800 hover:bg-gray-700 transition rounded"
      >
        Orçamento
      </Link>
      <Link
        to="../edit/apperance"
        state={{ project: project }}
        className={`py-3 px-4 mb-1 ${
          location.pathname === "/project/edit/apperance"
            ? "bg-green-700"
            : "bg-gray-800"
        } hover:bg-gray-700 transition rounded`}
      >
        Aparência
      </Link>
      <Link
        to="../edit/rewards"
        state={{ project: project }}
        className={`py-3 px-4 mb-1 ${
          location.pathname === "/project/edit/rewards"
            ? "bg-green-700"
            : "bg-gray-800"
        } hover:bg-gray-700 transition rounded`}
      >
        Recompensas
      </Link>
      <Link
        to=""
        state={{ project: project }}
        className="py-3 px-4 mb-1 bg-gray-800 hover:bg-gray-700 transition rounded"
      >
        Dados e Privacidade
      </Link>
    </div>
  );
};

export default MenuProjects;
