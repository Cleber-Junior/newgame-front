import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../assets/Context/TokenContext";
import { ProjectContext } from "../../assets/Context/ProjectContext";
import { myApi } from "../../service/api/api";
import { ToastContainer, toast } from "react-toastify";
import Placeholder from "../../assets/img/placeholder.svg";

const MenuProjects = () => {
  const [urlImage, setUrlImage] = React.useState("");
  const { projectData, saveProject } = React.useContext(ProjectContext);
  const { token } = React.useContext(TokenContext);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split("T")[0];

    const updateForm = {
      ...projectData,
      status: 1,
      start_date: formattedDate,
    };

    // Validação: verifica se algum campo do updateForm é null
    const hasNull = Object.values(updateForm).some((value) => value === null);
    if (hasNull) {
      toast.error("Preencha todos os campos antes de finalizar o projeto.");
      return;
    }

    try {
      const response = await myApi.post(
        `finishProject/${projectData.id}`,
        updateForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 201) {
        const data = response.data;
        toast.success(data.msg);
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
        console.log("response Img link", response);
        setUrlImage(response.data.url);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchImage();
  }, [projectData]);

  console.log("ProjectData", projectData);

  if (!projectData) {
    <></>;
  }

  return (
    <div className="flex flex-col min-h-screen overflow-hidden w-60 bg-header-bg text-white p-4">
      <ToastContainer autoClose={1000} />
      <div className="flex flex-col items-center mb-6">
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
            <img
              src={Placeholder} // Substitua pela URL correta da imagem do projeto
              alt="Projeto"
              className="w-full h-32 object-cover rounded-md mb-2"
            />
            <h2 className="text-sm font-semibold text-center">
              {projectData.name}
            </h2>
          </>
        )}
      </div>

      <Link
        to="../edit/name"
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
        className={`py-3 px-4 mb-1 ${
          location.pathname === "/project/edit/description"
            ? "bg-green-700"
            : "bg-gray-800"
        } hover:bg-gray-700 transition rounded`}
      >
        Descrição
      </Link>
      <Link
        to="../edit/apperance"
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
        className={`py-3 px-4 mb-1 ${
          location.pathname === "/project/edit/rewards"
            ? "bg-green-700"
            : "bg-gray-800"
        } hover:bg-gray-700 transition rounded`}
      >
        Recompensas
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
