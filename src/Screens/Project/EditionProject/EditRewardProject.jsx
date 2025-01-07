import React, { useEffect, useState } from "react";
import { TokenContext } from "../../../assets/Context/TokenContext";
import Loading from "../../../components/Projects/Loading";
import Modal from "../../../components/Modal/ModalConfirmation";
import { Trash2, Pencil } from "lucide-react";
import { myApi } from "../../../api/api";
import { ProjectContext } from "../../../assets/Context/ProjectContext";
import RewardList from "../../../components/Reward/RewardList";

const EditRewardProject = () => {
  const { projectData } = React.useContext(ProjectContext);
  const { token } = React.useContext(TokenContext);
  const [loading, setLoading] = React.useState(true);
  const [modal, setModal] = React.useState(false);
  const [rewards, setRewards] = React.useState([]);
  const [message, setMessage] = React.useState("");
  const [formData, setFormData] = React.useState({
    name: "",
    description: "",
    value: "",
  });

  const fetchRewards = async () => {
    try {
      const response = await myApi.get(`/rewards/project/${projectData.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response);
        setRewards(response.data.rewards);
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitReward = async (e) => {
    e.preventDefault();

    const updateForm = {
      ...formData,
      id_project: projectData.id,
    };

    try {
      const response = await myApi.post("/rewards", updateForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 201) {
        console.log(response);
        const data = response.data;
        setMessage(data.msg);
        setModal(true);
        setFormData({ name: "", description: "", value: "" });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteReward = async (id) => {
    try {
      const response = await myApi.delete(`/rewards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
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
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    fetchRewards();
  }, [modal]);

  if (loading) {
    return <Loading />;
  }

  console.log(rewards);

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
              value={formData.name}
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
              value={formData.value}
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
              value={formData.description}
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600"
          >
            Adicionar Recompensa
          </button>
        </form>
        <RewardList rewards={rewards} handleDeleteReward={handleDeleteReward} />
      </div>
    </div>
  );
};

export default EditRewardProject;
