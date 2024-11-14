import React, { useEffect } from "react";
import MenuProjects from "../../../components/Projects/MenuProjects";
import { useLocation } from "react-router-dom";
import { TokenContext } from "../../../assets/Context/TokenContext";
import { myApi } from "../../../api/api";
import Loading from "../../../components/Projects/Loading";
import Modal from "./ModalConfirmation";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const EditDescProject = () => {
  const location = useLocation();
  const project = location.state.project;
  const { token } = React.useContext(TokenContext);
  const [formData, setFormData] = React.useState({});
  const [message, setMessage] = React.useState("");
  const [modal, setModal] = React.useState(false);
  const [loading, setLoading] = React.useState(true);

  const fetchProject = async () => {
    try {
      const response = await myApi.get(`/projects/${project.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setFormData({
          description: response.data.project.description,
        });
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        console.log(response);
        const data = response.data;
        setMessage(data.msg);
        setModal(true);
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

  console.log(formData);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-8 gap-12">
      {modal && <Modal message={message} onClose={() => setModal(false)} />}
      <h2 className="text-2xl font-semibold text-center">
        Descrição do Projeto
      </h2>
      <p className="text-center text-gray-600">
        Aqui você pode editar a descrição do seu projeto.
        <br />
        Preencha com atenção e revise antes de lançar o projeto.
      </p>
      <div className="max-w-2xl w-full p-8 bg-gray-50 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <label className="block text-lg font-semibold mb-1" htmlFor="">
            Descrição do seu Projeto:
          </label>
          <p>
            A descrição é a parte mais importante do seu projeto. Aqui você deve
            explicar de forma clara e objetiva o que você pretende realizar,
            como pretende realizar e qual o impacto que você espera causar.
          </p>
          <ReactQuill
            theme="snow"
            name="description"
            className="h-80"
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
          />
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-green-500 text-white font-semibold py-2 px-4 rounded hover:bg-green-600 mt-10"
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditDescProject;
