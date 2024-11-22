import React, { useEffect } from "react";
import MenuProjects from "../../../components/Projects/MenuProjects";
import { useLocation } from "react-router-dom";
import { TokenContext } from "../../../assets/Context/TokenContext";
import { myApi } from "../../../api/api";
import Loading from "../../../components/Projects/Loading";
import Modal from "./ModalConfirmation";

const EditVisualProject = () => {
  const location = useLocation();
  const project = location.state.project;
  const { token } = React.useContext(TokenContext);
  const [urlImage, setUrlImage] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [modal, setModal] = React.useState(false);

  const fetchProject = async () => {
    try {
      const response = await myApi.get(`projects/${project.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        // console.log(response.data);
        setUrlImage(response.data.url);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateForm = new FormData(e.currentTarget);
    updateForm.append("_method", "patch");

    updateForm.forEach((value, key) => console.log(key, value));

    try {
      const response = await myApi.post(
        `updateProject/${project.id}`,
        updateForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response);
        const data = response.data;
        setUrlImage(data.url);
        setMessage(data.msg);
        setModal(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-8 gap-8">
      {modal && <Modal message={message} onClose={() => setModal(false)} />}
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
              <h1>Nenhuma imagem Selecionada</h1>
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
