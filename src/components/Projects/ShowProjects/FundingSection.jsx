import React from "react";
import { Link } from "react-router-dom";

const FundingSection = ({
  projectData,
  progressPercentage,
  daysRemaining,
  userId,
}) => {
  console.log("FundingSection projectData:", projectData, userId);
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
      <div className="md:col-span-2 flex justify-center min-w-[100px]">
        <img
          src={projectData.image}
          alt={projectData.name}
          className="rounded-md max-w-2xl min-w-[500px] min-h-[200px] max-h-[400px] object-cover"
        />
      </div>

      <div className="bg-gray-200 p-6 rounded-lg shadow-md w-full min-w-[270px] mx-auto flex flex-col justify-center items-center h-full">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black">
            R$ {projectData.current_value}
          </h2>
          <p className="text-gray-600 text-lg">
            Meta R$ {projectData.meta_value}
          </p>
        </div>

        <div className="w-full mt-4">
          <div className="relative w-full h-4 bg-gray-300 rounded-full overflow-hidden">
            <div
              className="h-4 bg-green-500 rounded-full transition-all duration-500"
              style={{ width: `${progressPercentage}%` }}
            ></div>
          </div>
          <div className="flex justify-between w-full text-sm text-gray-600 mt-2">
            <span>{progressPercentage}%</span>
            <span>{daysRemaining} dias restantes</span>
          </div>
        </div>

        {projectData.id_creator !== userId ? (
          <Link
            to={`../rewards/${projectData.id}`}
            state={{ idProject: projectData.id }}
            className="mt-6 text-center w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition"
          >
            Apoiar
          </Link>
        ) : null}
      </div>
    </div>
  );
};

export default FundingSection;
