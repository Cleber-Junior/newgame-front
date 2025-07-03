import { useState } from "react";
import { Trash2, Pencil } from "lucide-react";
import RewardModalDelete from "./RewardModalDelete";
import RewardModalEdit from "./RewardModalEdit";

const RewardList = ({ rewards, handleDeleteReward, onRewardUpdated }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);

  function openEditModal(reward) {
    setSelectedReward(reward);
    setIsEditModalOpen(true);
  }

  function closeEditModal() {
    setIsEditModalOpen(false);
    setSelectedReward(null);
  }

  function openDeleteModal(reward) {
    setSelectedReward(reward);
    setIsDeleteModalOpen(true);
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
    setSelectedReward(null);
  }

  async function handleConfirmDelete() {
    if (!selectedReward) return;
    await handleDeleteReward(selectedReward.id);
    closeDeleteModal();
  }

  async function handleConfirmSave(updatedReward) {
    onRewardUpdated(updatedReward); // Informa o componente pai sobre a atualização
    closeEditModal();
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md w-2/5">
      <h3 className="text-lg font-semibold text-green-500 mb-4">
        Recompensas Criadas
      </h3>
      <ul className="space-y-4 max-h-96 overflow-y-auto scrollbar-custom">
        {rewards.map((reward, index) => (
          <li
            className="flex justify-between items-center border-b pb-2"
            key={index}
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
                <Pencil size={20} onClick={() => openEditModal(reward)} />
              </div>
              <div className="hover:text-red-500 transition duration-200 cursor-pointer">
                <Trash2 size={20} onClick={() => openDeleteModal(reward)} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <RewardModalDelete
        isOpen={isDeleteModalOpen}
        onClose={closeDeleteModal}
        Reward={selectedReward}
        onConfirm={handleConfirmDelete}
      />
      <RewardModalEdit
        isOpen={isEditModalOpen}
        onClose={closeEditModal}
        Reward={selectedReward}
        onConfirm={handleConfirmSave}
      />
    </div>
  );
};

export default RewardList;
