import React from "react";
import { Link } from "react-router-dom";

const RewardCard = ({ rewards, idProject }) => {
  return (
    <div className="flex flex-col items-start gap-4 p-[0.3rem] max-w-20">
      {rewards.map((reward) => (
        <div
          key={reward.id}
          className="flex items-center justify-center bg-gray-100"
        >
          <Link to={`../rewards/${idProject}`} state={{idProject, selectedRewardId: reward.id}}>
            <div className="border-2 rounded-xl p-4 shadow-md bg-gray-200 mx-auto min-w-[330px] hover:border-green-500 cursor-pointer">
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
