import { myApi } from "../../service/api/api";
import { handleSave } from "../UtilsUser/UtilsUser";

export async function fetchRewards(token, id) {
  try {
    const response = await myApi.get(`/rewards/project/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export function handleChange(setFormData) {
  return (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
}

export async function handleDeleteReward(id, token) {
  try {
    const response = await myApi.delete(`/rewards/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      return response;
    }
  } catch (error) {
    console.log(error);
    return response;
  }
}

export async function handleSubmitReward(token, formData, id) {
  const updateForm = {
    ...formData,
    id_project: id,
  };

  try {
    const response = await myApi.post("/rewards", updateForm, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 201) {
      return response;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function handlePayment(token, idProject, rewardData, userId, saveUser, userData){
  const formUpdate = {
    reward: {
      ...rewardData
    },
    user: {
      ...userData
    },
    project: {
      id: idProject
    }
  }

  try  {
    const userSave = await handleSave(token, userId, saveUser,  userData)
    if(userSave.user){
      const responseLink = await myApi.post("/payReward", formUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if(responseLink.status === 201){
        console.log("responseLink", responseLink)
        return responseLink;
      }
    }
  } catch (error){
    console.error("Error during payment:", error);
  }
}

// Att Usuario -> Chama Função de redirecionar usuario para a tela do Mercado -> 
// Tabela pagamento
// Fazer logica pagamento 