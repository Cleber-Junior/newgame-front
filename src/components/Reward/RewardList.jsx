import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import RewardModalDelete from "./RewardModalDelete";

const RewardList = ({ rewards, handleDeleteReward }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  function openModal(rewardId) {
    setSelectedReward(rewardId);
    setIsModalOpen(true);
  }

  function closeModal() {
    setIsModalOpen(false);
    setSelectedReward(null);
  }

  async function handleConfirmDelete(rewardId) {
    await handleDeleteReward(rewardId); // Chama a função de exclusão
    closeModal(); // Fecha o modal
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-2/5">
      <h3 className="text-lg font-semibold text-green-500 mb-4">
        Recompensas Criadas
      </h3>
      <ul className="space-y-4 max-h-96 overflow-y-auto scrollbar-custom">
        {rewards.map((reward) => (
          <li
            className="flex justify-between items-center border-b pb-2"
            key={reward.id}
          >
            <div>
              <h4 className="font-semibold">{reward.name}</h4>
              <p className="text-sm text-gray-600">{reward.description}</p>
              <span className="text-green-500 font-semibold">
                R${reward.value}
              </span>
            </div>

            <div className="flex space-x-3 m-3">
              <div className="hover:text-blue-500 transition duration-200 cursor-pointer">
                <Pencil size={20} />
              </div>
              <div className="hover:text-red-500 transition duration-200 cursor-pointer">
                <Trash2 size={20} onClick={() => openModal(reward.id)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <RewardModalDelete
        isOpen={isModalOpen}
        onClose={closeModal}
        Reward={selectedReward}
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default RewardList;
