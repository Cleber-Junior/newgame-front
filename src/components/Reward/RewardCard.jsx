import React from "react";

const RewardCard = ({ rewards }) => {
  return (
    <div className="flex flex-col items-start gap-4 bg-gray-100 p-4">
      <div className="flex items-center justify-center bg-gray-100">
        <div className="border-2 border-green-500 rounded-xl p-4 shadow-md bg-white max-w-sm min-w-[330px]">
          <h2 className="text-lg font-bold text-green-500">
            {rewards.name}
          </h2>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Valor:</span> R$ {rewards.value}
          </p>
          <p className="mt-4 text-gray-700">
            <span className="font-semibold">Descrição:</span> {rewards.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default RewardCard;
