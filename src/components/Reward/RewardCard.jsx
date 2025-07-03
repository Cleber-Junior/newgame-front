import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../assets/Context/UserContext";

const RewardCard = ({ rewards, idProject, creatorId}) => {
  const {user} = React.useContext(UserContext);

  console.log(creatorId, "AQUI");
  return (
    <div className="flex flex-col items-stretch gap-4 p-2 min-w-[300px]">
      {rewards.map((reward) => {
        const isCreator = user?.id === creatorId;
        const cardContent = (
          <div className={`border-2 rounded-xl p-4 shadow-md bg-gray-200 ${!isCreator ? "hover:border-green-500 cursor-pointer" : "opacity-60"}`}>
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
        );

        return (
          <div key={reward.id}>
            {isCreator ? (
              cardContent
            ) : (
              <Link
                to={`../rewards/${idProject}`}
                state={{ idProject, selectedRewardId: reward.id }}
                className="hover:border-green-500"
              >
                {cardContent}
              </Link>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RewardCard;
