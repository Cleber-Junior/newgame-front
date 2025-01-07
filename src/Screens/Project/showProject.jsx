import React from "react";
import { useParams } from "react-router-dom";
import { myApi } from "../../api/api";
import Loading from "../../components/Projects/Loading";

const ShowProject = () => {
  const { nome } = useParams();
  const [projectData, setProjectData] = React.useState({});
  const [rewardData, setRewardData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchProject = async () => {
    try {
      const response = await myApi.get(`/projects/${nome}`);
      if (response.status === 200) {
        console.log(response);
        setProjectData(response.data.project[0]);
        setRewardData(response.data.rewards[0]);
        setLoading(false);
      }
    } catch (error) {
      console.error("Erro ao buscar projeto", error);
      setLoading(false);
      setErrorMessage("Erro ao buscar projeto");
    }
  };

  //Calcula o progresso da campanha
  const progressPercentage = Math.min(
    (parseFloat(projectData.current_value) /
      parseFloat(projectData.meta_value)) *
      100,
    100
  ).toFixed(2);

  // Calcula os dias restantes
  const daysRemaining = Math.max(
    Math.ceil(
      (new Date(projectData.end_date) - new Date()) / (1000 * 60 * 60 * 24)
    ),
    0
  );

  React.useEffect(() => {
    fetchProject();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-4xl font-bold">{projectData.name}</h1>
        <p className="text-lg text-gray-600">por Supergiant Games</p>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Image Section */}
        <div className="md:col-span-2">
          <img
            src={projectData.image}
            alt={projectData.name}
            className="rounded-md"
          />
        </div>

        {/* Funding Section */}
        <div className="bg-gray-200 p-4 rounded-md shadow-md">
          <div className="text-center">
            <h2 className="text-2xl font-bold">
              R$ {projectData.current_value}
            </h2>
            <p className="text-gray-600">Meta R$ {projectData.meta_value}</p>
          </div>
          <div className="mt-4">
            <div className="relative w-full h-4 bg-gray-300 rounded-full">
              <div
                className="absolute top-0 left-0 h-4 bg-green-500 rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm text-gray-600 mt-2">
              <span>{progressPercentage}%</span>
              <span>{daysRemaining} dias restantes</span>
            </div>
          </div>
          <div className="mt-4 text-center">
            <button className="mt-4 w-80 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
              Apoiar
            </button>
          </div>
        </div>
      </div>

      {/* Description and Rewards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Description */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Descrição do Projeto:</h3>
          <div
            className="text-gray-700 text-sm leading-relaxed"
            dangerouslySetInnerHTML={{ __html: projectData.description }}
          ></div>
        </div>

        {/* Rewards */}
        <div>
          <h3 className="text-xl font-semibold mb-2">Recompensas</h3>
          
        </div>
      </div>
    </div>
  );
};

export default ShowProject;
