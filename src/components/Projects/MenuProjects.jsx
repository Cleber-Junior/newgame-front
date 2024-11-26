import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FecthContext } from "../../assets/Context/FetchContext";
import Modal from "../../Screens/Project/EditionProject/ModalConfirmation";
import { myApi } from "../../api/api";
import { TokenContext } from "../../assets/Context/TokenContext";

const MenuProjects = ({ project }) => {
  const location = useLocation();
  const { token } = React.useContext(TokenContext);
  const navigate = useNavigate();
  const { projectData, fetchProjectData } = React.useContext(FecthContext);
  const [message, setMessage] = React.useState("");
  const [modal, setModal] = React.useState(false);

  const handleSubmit = async () => {
    console.log(project);
    const formData = {
      ...project,
      status: 1,
    };

    try {
      const response = await myApi.post(
        `finishProject/${project.id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        const data = response.data;
        setMessage(data.msg);
        setModal(true);
        const Timer = setTimeout(() => {
          clearTimeout(Timer);
          navigate("../../user/projects");
        }, 3000);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (project.id) {
      fetchProjectData(project.id);
    }
  }, []);

  console.log(projectData);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden w-60 bg-header-bg text-white p-4">
      {modal && <Modal message={message} onClose={() => setModal(false)} />}
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

      <button
        onClick={handleSubmit}
        className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 mt-10"
      >
        Finalizar Projeto
      </button>
    </div>
  );
};

export default MenuProjects;
