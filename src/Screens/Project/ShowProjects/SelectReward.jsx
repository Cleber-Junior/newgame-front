import { useEffect, useState, useContext, useRef } from "react";
import { useLocation } from "react-router-dom";
import RewardSelect from "../../../components/Reward/RewardSelect";
import { TokenContext } from "../../../assets/Context/TokenContext";
import ErrorTokenScreen from "../../../components/Common/ErrorTokenScreen";
import { fetchRewards } from "../../../Utils/UtilsRewards/UtilsReward";

const SelectReward = () => {
  const location = useLocation();
  const { idProject, selectedRewardId } = location.state || {};
  const { token } = useContext(TokenContext);
  const [selectedReward, setSelectedReward] = useState(
    selectedRewardId || null
  );
  const [rewards, setRewards] = useState([]);
  const selectedRewardRef = useRef(null);

  useEffect(() => {
    async function getRewards() {
      const result = await fetchRewards(token, idProject);
      setRewards(result.data.rewards);
    }
    getRewards();
  }, [token]);

  useEffect(() => {
    if (selectedRewardRef.current) {
      selectedRewardRef.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
    }
  });

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
          <div
            key={reward.id}
            ref={selectedReward === reward.id ? selectedRewardRef : null}
          >
            <RewardSelect
              key={reward.id}
              reward={reward}
              projectId={idProject}
              selected={selectedReward === reward.id}
              onSelect={() => setSelectedReward(reward.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectReward;
