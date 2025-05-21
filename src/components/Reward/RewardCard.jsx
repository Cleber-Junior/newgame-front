import React from "react";
import { Link } from "react-router-dom";

const RewardCard = ({ rewards, idProject }) => {
  return (
    <div className="flex flex-col items-stretch gap-4 p-2 min-w-[300px]">
      {rewards.map((reward) => (
        <div
          key={reward.id}
        >
          <Link
            to={`../rewards/${idProject}`}
            state={{ idProject, selectedRewardId: reward.id }}
            className="hover:border-green-500"
          >
            <div className="border-2 rounded-xl p-4 shadow-md bg-gray-200 hover:border-green-500 cursor-pointer">
              <h2 className="text-lg font-bold text-green-500">
                {reward.name || "Sem nome"}
              </h2>
              <p className="mt-2 text-gray-700">
                <span className="font-semibold">Valor:</span> R$ {reward.value}
              </p>
              <p className="mt-4 text-gray-700">
                <span className="font-semibold">Descrição:</span>
                <br />
                {reward.description}
              </p>
            </div>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default RewardCard;
