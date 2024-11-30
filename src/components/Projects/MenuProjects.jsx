import React, { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TokenContext } from "../../assets/Context/TokenContext";
import { ProjectContext } from "../../assets/Context/ProjectContext";
import { myApi } from "../../api/api";
import Modal from "./Modal/ModalConfirmation";

const MenuProjects = ({ project }) => {
  const location = useLocation();
  const projectLocal = location.state.project;
  const [urlImage, setUrlImage] = React.useState("");
  const { projectData, saveProject } = React.useContext(ProjectContext);
  const { token } = React.useContext(TokenContext);
  const navigate = useNavigate();
  const [message, setMessage] = React.useState("");
  const [modal, setModal] = React.useState(false);

  const handleSubmit = async () => {
    console.log("Form Enviado: ", projectData);

    try {
      const response = await myApi.post(
        `finishProject/${projectData.id}`,
        projectData,
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

  const fetchImage = async () => {
    try {
      const response = await myApi.get(`/project/image/${projectData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log("response Img link",response);
        setUrlImage(response.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (projectLocal) {
      saveProject(projectLocal);
      fetchImage();
      console.log(projectData);
    }
  }, []);

  console.log("Dados no projeto a ser enviado", projectData);

  return (
    <div className="flex flex-col min-h-screen overflow-hidden w-60 bg-header-bg text-white p-4">
      <div className="flex flex-col items-center mb-6">
        {modal && <Modal message={message} onClose={() => setModal(false)} />}
        {urlImage ? (
          <>
            <img
              src={urlImage} // Substitua pela URL correta da imagem do projeto
              alt="Projeto"
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h2 className="text-sm font-semibold text-center">
              {projectData.name}
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
