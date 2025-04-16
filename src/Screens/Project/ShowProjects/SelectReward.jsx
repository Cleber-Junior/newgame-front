import { useEffect, useState, useContext } from "react";
import { Link, useParams } from "react-router-dom";
import RewardSelect from "../../../components/Reward/RewardSelect";
import { myApi } from "../../../service/api/api";
import { TokenContext } from "../../../assets/Context/TokenContext";
import ErrorTokenScreen from "../../../components/Common/ErrorTokenScreen";

const SelectReward = () => {
  const { id } = useParams();
  const { token } = useContext(TokenContext);

  const [selectedReward, setSelectedReward] = useState(null);
  const [rewards, setRewards] = useState([]);

  const fetchRewards = async () => {
    try {
      const response = await myApi.get(`/rewards/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        console.log(response);
        setRewards(response.data.rewards);
      }
    } catch (error) {
      console.error("Erro ao buscar recompensas", error);
    }
  };

  useEffect(() => {
    fetchRewards();
  }, []);

  if (!token) {
    return <ErrorTokenScreen />;
  }

  return (
    <div>
      <div>
        <h1 className="text-4xl mt-4 font-semibold text-center">
          Selecione a recompensa
        </h1>
        <p className="mt-[2px] text-center">
          Selecione a recompensa que deseja apoiar
        </p>
      </div>
      <div className="max-w-screen-xl mx-auto space-y-4 p-6">
        {rewards.map((reward) => (
          <RewardSelect
            key={reward.id}
            reward={reward}
            selected={selectedReward === reward.id}
            onSelect={() => setSelectedReward(reward.id)}
          />
        ))}
      </div>
    </div>
  );
};

export default SelectReward;
