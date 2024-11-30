import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { TokenContext } from "../../../assets/Context/TokenContext";
import { ProjectContext } from "../../../assets/Context/ProjectContext";
import { myApi } from "../../../api/api";
import Loading from "../../../components/Projects/Loading";
import Modal from "../../../components/Projects/Modal/ModalConfirmation";

const editNameProject = () => {
  let location = useLocation();
  let project = location.state.project;
  const { saveProject } = React.useContext(ProjectContext);
  const { token } = React.useContext(TokenContext);
  const [formData, setFormData] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [loading, setLoading] = React.useState(true);
  const [modal, setModal] = React.useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateForm = {
      ...formData,
      _method: "patch",
    };

    try {
      const response = await myApi.post(
        `/updateProject/${project.id}`,
        updateForm,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        console.log(response.data);
        const data = response.data;
        setMessage(data.msg);
        setModal(true);
        saveProject(data.project);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const fetchProject = async () => {
    try {
      const response = await myApi.get(`/projects/${project.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.status === 200) {
        setFormData(response.data.project);
        console.log(response.data.project);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (e) => {
    e.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-8 gap-14">
      {modal && <Modal message={message} onClose={() => setModal(false)} />}
      <h2 className="text-2xl font-semibold text-center">
        Preencha as informações abaixo
      </h2>
      <p className="text-center text-gray-600">
        Os dados informados nessa seção não poderão ser modificados.
        <br />
        Preencha com atenção e revise antes de lançar o projeto.
      </p>

      {/* Verificação do formData */}
      {formData && (
        <div className="max-w-2xl w-full p-8 bg-gray-50 rounded-lg shadow-md">
          {/* Campo de Nome do Projeto */}
          <form onSubmit={handleSubmit} className="mb-4">
            <label className="block text-lg font-semibold mb-1">
              Nome do Projeto
            </label>
            <p className="text-gray-500 text-sm mb-2">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
              volutpat augue.
            </p>
            <input
              type="text"
              name="name"
              placeholder="Nome do Projeto"
              value={formData.name}
              onChange={handleChange}
              className="w-full border-b-2 border-gray-300 py-2 px-4 mb-4 focus:outline-none focus:border-green-500"
            />
            {/* Botão posicionado à direita */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600"
              >
                Salvar
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default editNameProject;
