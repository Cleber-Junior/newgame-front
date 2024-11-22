import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { TokenContext } from "../../../assets/Context/TokenContext";
import Loading from "../../../components/Projects/Loading";
import Modal from "./ModalConfirmation";
import { myApi } from "../../../api/api";

const EditRewardProject = () => {
  const location = useLocation();
  const project = location.state.project;
  const { token } = React.useContext(TokenContext);
  const [loading, setLoading] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    value: "",
    id_project: project.id,
  });

  const handleSubmitReward = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.post("/rewards", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  console.log(formData);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4 gap-6">
      {modal && <Modal message={message} onClose={() => setModal(false)} />}

      <h2 className="text-2xl font-semibold text-center">Recompensas</h2>
      <p className="text-center text-gray-600 max-w-lg">
        Aqui você pode adicionar e editar as recompensas para o seu projeto.
        Será possível editar as recompensas após a criação.
      </p>

      <div className="flex flex-col md:flex-row mt-8 w-full max-w-5xl gap-8">
        {/* Formulário de recompensas */}
        <form
          onSubmit={handleSubmitReward}
          className="bg-white p-6 rounded-lg shadow-md w-3/5"
        >
          <h3 className="text-lg font-semibold text-green-500 mb-4">
            Adicionar Recompensa
          </h3>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Título:</label>
            <input
              type="text"
              name="name"
              placeholder="Título da recompensa"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Valor:</label>
            <input
              type="text"
              name="value"
              placeholder="R$"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Descrição:</label>
            <textarea
              name="description"
              placeholder="Descrição da recompensa"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
              onChange={handleChange}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600"
          >
            Salvar Reconpensa
          </button>
        </form>

        {/* Lista de recompensas */}
        <div className="bg-white p-6 rounded-lg shadow-md w-2/5">
          <h3 className="text-lg font-semibold text-green-500 mb-4">
            Recompensas Criadas
          </h3>
          <ul className="space-y-4">
            {/* Exemplo de recompensa */}
            <li className="border-b pb-2">
              <h4 className="font-semibold">Título da Recompensa</h4>
              <p className="text-sm text-gray-600">
                Descrição breve da recompensa.
              </p>
              <span className="text-green-500 font-semibold">R$50</span>
            </li>
            {/* Outras recompensas seriam renderizadas dinamicamente */}
          </ul>
        </div>
      </div>

      {/* Botão para criar mais recompensas */}
      <button className="mt-8 bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600">
        + Adicionar mais recompensas
      </button>
    </div>
  );
};

export default EditRewardProject;
