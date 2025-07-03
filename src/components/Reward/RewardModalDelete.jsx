import React from "react";

const RewardModalDelete = ({ isOpen, onConfirm, onClose, Reward }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-5 rounded-lg text-center shadow-lg w-96">
        <h2 className="text-lg font-bold mb-4">Confirmar exclusão</h2>
        <p className="text-sm text-gray-600">
          Tem certeza que deseja executar essa exclusão?
        </p>
        <button
          className="m-2 w-4/5 p-2 bg-green-600 text-white rounded cursor-pointer hover:bg-green-700"
          onClick={() => {
            onConfirm(Reward);
            onClose();
          }}
        >
          Sim, deletar
        </button>
        <button
          className="m-2 w-4/5 p-2 bg-red-500 text-white rounded cursor-pointer hover:bg-red-700"
          onClick={onClose}
        >
          Cancelar
        </button>
      </div>
    </div>
  );
};

export default RewardModalDelete;
