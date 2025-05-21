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

export async function handlePayment(
  token,
  idProject,
  rewardData,
  userId,
  saveUser,
  userData
) {
  const formUpdate = {
    reward_id: rewardData.id,
    user: userData.id,
    project_id: idProject,
  };

  try {
    const userSave = await handleSave(token, userId, saveUser, userData);
    if (userSave.user) {
      const responseLink = await myApi.post("/payreward", formUpdate, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (responseLink.status === 201) {
        console.log("responseLink", responseLink);
        return responseLink;
      }
    }
  } catch (error) {
    console.error("Error during payment:", error);
  }
}

export async function getCep(cep) {
  console.log(cep);
  const url = `https://viacep.com.br/ws/${cep}/json/`;
  console.log(url);
  try {
    const response = await fetch(url);
    if(response.status === 200){
      const data = await response.json();
      console.log("response", data);
      return data;
    }
  } catch (error) {
    console.error("Error fetching CEP data:", error);
  }
}

// Att Usuario -> Chama Função de redirecionar usuario para a tela do Mercado ->
// Tabela pagamento
// Fazer logica pagamento
