import React from "react";
import { useParams } from "react-router-dom";
import { myApi } from "../../../service/api/api";
import Loading from "../../../components/Common/Loading";
import RewardCard from "../../../components/Reward/RewardCard";
import FundingSection from "../../../components/Projects/ShowProjects/FundingSection";
import { UserContext } from "../../../assets/Context/UserContext";
import DescriptionSection from "../../../components/Projects/ShowProjects/DescriptionSection";

const ShowProject = () => {
  const { id } = useParams();
  const { user } = React.useContext(UserContext);
  const [projectData, setProjectData] = React.useState({});
  const [rewardData, setRewardData] = React.useState({});
  const [loading, setLoading] = React.useState(true);

  const fetchProject = async () => {
    try {
      const response = await myApi.get(`/project/${id}`);
      if (response.status === 200) {
        console.log(response);
        const project = response.data.project;
        setProjectData(project.find((p) => p.id === parseInt(id)));
        setRewardData(response.data.rewards);
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
      </div>

      <FundingSection
        projectData={projectData}
        progressPercentage={progressPercentage}
        daysRemaining={daysRemaining}
        userId={user?.id}
      />

      <DescriptionSection projectData={projectData} rewardData={rewardData} />
    </div>
  );
};

export default ShowProject;
