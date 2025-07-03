import React, { useEffect, useContext } from "react";
import { toast } from "react-toastify";
import { handleSaveReward } from "../../Utils/UtilsRewards/UtilsReward";
import { TokenContext } from "../../assets/Context/TokenContext";

const RewardModalEdit = ({ isOpen, onConfirm, onClose, Reward }) => {
  const { token } = useContext(TokenContext);
  if (!isOpen) return null;

  const [formData, setFormData] = React.useState({
    name: Reward.name || "",
    value: Reward.value || "",
    description: Reward.description || "",
  });

  useEffect(() => {
    if (Reward) {
      setFormData({
        name: Reward.name || "",
        value: Reward.value || "",
        description: Reward.description || "",
        id_project: Reward.id_project || "",
      });
    }
  }, [Reward]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await handleSaveReward(Reward.id, token, formData);
    if (response && response.status === 200) {
      console.log(response.data.reward, "AQUI")
      onConfirm(response.data.reward);
      onClose();
    } else {
      toast.error("Não foi possível salvar as alterações. Tente novamente.");
    }
  };

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg text-left shadow-lg w-full max-w-md relative">
        {/* Botão de Fechar (X) */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-2xl"
          aria-label="Fechar"
        >
          &times;
        </button>

        <h2 className="text-xl font-bold mb-4">Editar Recompensa</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 mb-2">
              Título:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Título da recompensa"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="value" className="block text-gray-700 mb-2">
              Valor:
            </label>
            <input
              type="text" // Considere usar type="number" se for um valor numérico
              id="value"
              name="value"
              value={formData.value}
              onChange={handleChange}
              placeholder="R$"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label htmlFor="description" className="block text-gray-700 mb-2">
              Descrição:
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Descrição da recompensa"
              className="w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              rows="4"
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-green-600 w-full"
          >
            Salvar Alterações
          </button>
        </form>
      </div>
    </div>
  );
};

export default RewardModalEdit;
