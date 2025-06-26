import React, { useEffect } from "react";
import { TokenContext } from "../../../assets/Context/TokenContext";
import { ProjectContext } from "../../../assets/Context/ProjectContext";
import { myApi } from "../../../service/api/api";
import Loading from "../../../components/Common/Loading";
import { ToastContainer, toast } from "react-toastify";
import Placeholder from "../../../assets/img/placeholder.svg";

const EditVisualProject = () => {
  const { projectData, saveProject } = React.useContext(ProjectContext);
  const { token } = React.useContext(TokenContext);
  const [urlImage, setUrlImage] = React.useState("");
  const [loading, setLoading] = React.useState(true);

  console.log("Dentro da Vis", projectData);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!e.target.image.files[0]) {
      toast.error("Por favor, selecione uma imagem.");
      return;
    }

    const updateForm = new FormData();
    updateForm.append("image", e.target.image.files[0]);
    updateForm.append("_method", "patch");

    try {
      const response = await myApi.post(
        `/updateProject/${projectData.id}`,
        updateForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        toast.success(response.data.msg);
        setUrlImage(response.data.url);
        console.group(response.data.project);
        saveProject(response.data.project);
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
    if (projectData) {
      setLoading(false);
      fetchImage();
    }
  }, []);

  useEffect(() => {
    console.log(projectData);
  }, projectData);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-8 gap-8">
      <h2 className="text-2xl font-semibold text-center">Visual do Projeto</h2>
      <p className="text-center text-gray-600">
        Aqui você pode alterar a imagem de capa do seu projeto.
        <br />
        Preencha com atenção e revise antes de lançar o projeto.
      </p>

      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <div className="flex h-[550px] w-[1050px] mb-8 border-2 border-gray-300">
          {urlImage ? (
            <img
              className="w-full h-full object-cover"
              src={urlImage}
              alt="Imagem do Projeto"
            />
          ) : (
            <>
              <img
                src={Placeholder} // Substitua pela URL correta da imagem do projeto
                alt="Projeto"
                className="w-full h-full object-cover"
              />
            </>
          )}
        </div>

        <div className="flex justify-between items-center w-full gap-4 mb-8">
          <div>
            <label>
              <span className="sr-only">Selecionar Imagem</span>
              <input
                className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
                file:rounded-lg file:border-0 file:text-sm file:font-semibold
                file:bg-green-50 file:text-green-700 hover:file:bg-green-100"
                type="file"
                name="image"
                id="image"
              />
            </label>
          </div>
          <div>
            <button
              type="submit"
              className=" px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 focus:ring-2 focus:ring-green-500 focus:outline-none ml-10"
            >
              Salvar Alterações
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditVisualProject;
