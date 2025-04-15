import { myApi } from "../../service/api/api";

export async function fetchRewards (token, id) {
    try {
      const response = await myApi.get(`/rewards/project/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response
      }
    } catch (error) {
      console.log(error);
      return error
    }
};

export function handleChange(setFormData) {
  return (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
}

 export async function handleDeleteReward (id, token) {
    try {
      const response = await myApi.delete(`/rewards/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        return response
      }
    } catch (error) {
      console.log(error);
      return response
    }
};

export async function handleSubmitReward (token, formData, id) {

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
};
