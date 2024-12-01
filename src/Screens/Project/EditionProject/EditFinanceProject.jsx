import React, { useEffect } from "react";
import { TokenContext } from "../../../assets/Context/TokenContext";
import { myApi } from "../../../api/api";
import Loading from "../../../components/Projects/Loading";
import Modal from "../../../components/Projects/Modal/ModalConfirmation";
import { ProjectContext } from "../../../assets/Context/ProjectContext";

const EditFinanceProject = () => {
  const { projectData, saveProject } = React.useContext(ProjectContext);
  const { token } = React.useContext(TokenContext);
  const [loading, setLoading] = React.useState(true);
  const [formData, setFormData] = React.useState({
    meta_value: projectData.meta_value,
    end_date: projectData.end_date,
  });
  const [modal, setModal] = React.useState(false);
  const [message, setMessage] = React.useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateForm = {
      ...formData,
      _method: "patch",
    };

    try {
      const response = await myApi.post(
        `updateProject/${projectData.id}`,
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
        saveProject(data.project);
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
    if (projectData) {
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center pt-8 gap-6">
      {modal && <Modal message={message} onClose={() => setModal(false)} />}
      <h2 className="text-2xl font-semibold text-center">
        Preencha as informações abaixo
      </h2>
      <p className="text-center text-gray-600">
        Informe a meta de arrecadação e o tempo de arrecadação do projeto.
        <br />
        Preencha com atenção e revise antes de lançar o projeto.
      </p>
      <div className="max-w-2xl w-full p-8 bg-gray-50 rounded-lg shadow-md">
        <form onSubmit={handleSubmit} className="flex flex-col">
          <label className="block text-lg font-semibold mb-1">
            Meta de Arrecadação
          </label>
          <p>Informe o valor total que deseja arrecadar com o projeto.</p>
          <input
            type="text"
            name="meta_value"
            id="meta_value"
            placeholder="R$"
            value={formData.meta_value}
            onChange={handleChange}
            className="w-full border-b-2 border-gray-300 py-2 px-4 mb-4 focus:outline-none focus:border-green-500"
          />
          <label className="block text-lg font-semibold mb-1">
            Tempo de Arrecadação
          </label>
          <p>
            Informe a data final para arrecadação do valor total do projeto.
          </p>
          <input
            type="date"
            name="end_date"
            id="end_date"
            onChange={handleChange}
            value={formData.end_date}
            className="w-full border-b-2 border-gray-300 py-2 px-4 mb-4 focus:outline-none focus:border-green-500"
          />
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
    </div>
  );
};

export default EditFinanceProject;
