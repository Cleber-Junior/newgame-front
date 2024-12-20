import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../assets/Context/TokenContext";
import { UserContext } from "../../assets/Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import Modal from "../../components/Modal/ModalConfirmation";
import ErrorModal from "../../components/Modal/ErrorModal";
import { myApi } from "../../api/api";

const CreateProject = () => {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const [modal, setModal] = React.useState(false);
  const [errorModal, setErrorModal] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [errorMessage, setErrorMessage] = React.useState("");
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    id_creator: user.id,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await myApi.post("/createProject", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        console.log("Projeto criado com sucesso", response);
        setModal(true);
        setMessage(response.data.msg);
        const Timer = setTimeout(() => {
          clearTimeout(Timer);
          navigation("../../user/projects");
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao criar projeto", error);
      setErrorMessage(error.response.data.message);
      setErrorModal(true);
    }
  };

  return (
    <div className="flex items-center justify-center h-[100%]">
      {modal && <Modal message={message} onClose={() => setModal(false)} />}
      {errorModal && (
        <ErrorModal
          message={errorMessage}
          onClose={() => setErrorModal(false)}
        />
      )}
      <div className="w-full max-w-md p-8 bg-gray-100 rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center text-green-500 mb-6">
          Cadastrar Novo Projeto
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do Projeto:
            </label>
            <input
              type="text"
              id="projectName"
              name="name"
              placeholder="Digite o nome do projeto"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
          >
            Registrar Projeto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
