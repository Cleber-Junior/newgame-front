import React from "react";
import RewardCard from "../../Reward/RewardCard";

const DescriptionSection = ({ rewardData, projectData }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[65%_35%] gap-8 mt-6">
      {/* Descrição do Projeto */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Descrição do Projeto:</h3>
        {projectData.description ? (
          <div
            className="text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: projectData.description }}
          ></div>
        ) : (
          <p className="text-gray-700 text-sm leading-relaxed">
            Este projeto não possui descrição.
          </p>
        )}
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-4">Recompensas</h3>
        <RewardCard rewards={rewardData} idProject={projectData.id} creatorId={projectData.id_creator}/>
      </div>
    </div>
  );
};

export default DescriptionSection;
