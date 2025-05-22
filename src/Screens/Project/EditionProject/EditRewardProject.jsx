import { useEffect, useState, useContext } from "react";
import { TokenContext } from "../../../assets/Context/TokenContext";
import Loading from "../../../components/Common/Loading";
import { ProjectContext } from "../../../assets/Context/ProjectContext";
import { ToastContainer, toast } from "react-toastify";
import RewardList from "../../../components/Reward/RewardList";
import {
  handleDeleteReward,
  fetchRewards,
  handleChange,
  handleSubmitReward,
} from "../../../Utils/UtilsRewards/UtilsReward";

const EditRewardProject = () => {
  const { projectData } = useContext(ProjectContext);
  const { token } = useContext(TokenContext);
  const [loading, setLoading] = useState(true);
  const [rewards, setRewards] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    value: "",
  });

  const getRewards = async () => {
    const response = await fetchRewards(token, projectData.id);
    if (response.status === 200) {
      setRewards(response.data.rewards);
      setLoading(false);
    }
  };

  const submitReward = async (e) => {
    e.preventDefault();
    const response = await handleSubmitReward(token, formData, projectData.id);
    if (response.status === 201) {
      setRewards((prevRewards) => [...prevRewards, response.data.reward]);
      toast.success(response.data.msg);
      setFormData({ name: "", description: "", value: "" });
    }
  };

  const deleteReward = async (rewardId) => {
    try {
      const response = await handleDeleteReward(rewardId, token);
      console.log(response);
      if (response.status === 200) {
        setRewards((prevRewards) =>
          prevRewards.filter((reward) => reward.id !== rewardId)
        );
        toast.success(response.data.msg);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRewards();
  }, [token]);

  if (loading) {
    return <Loading />;
  }

  console.log(rewards);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8 px-4 gap-6">
      <h2 className="text-2xl font-semibold text-center">Recompensas</h2>
      <p className="text-center text-gray-600 max-w-lg">
        Aqui você pode adicionar e editar as recompensas para o seu projeto.
        Será possível editar as recompensas após a criação.
      </p>

      <div className="flex flex-col md:flex-row mt-8 w-full max-w-5xl gap-8">
        {/* Formulário de recompensas */}
        <form
          onSubmit={submitReward}
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
              onChange={handleChange(setFormData)}
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
              onChange={handleChange(setFormData)}
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
              onChange={handleChange(setFormData)}
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
        <RewardList rewards={rewards} handleDeleteReward={deleteReward} />
      </div>
    </div>
  );
};

export default EditRewardProject;
