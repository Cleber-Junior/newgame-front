import React from "react";
import RewardCard from "../../Reward/RewardCard";

const DescriptionSection = ({ rewardData, projectData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-6 mt-6">
      <div>
        <h3 className="text-xl font-semibold mb-2">Descrição do Projeto:</h3>
        <div
          className="text-gray-700 text-sm leading-relaxed"
          dangerouslySetInnerHTML={{ __html: projectData.description }}
        ></div>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">Recompensas</h3>
        <RewardCard rewards={rewardData} idProject={projectData.id} />
      </div>
    </div>
  );
};

export default DescriptionSection;
