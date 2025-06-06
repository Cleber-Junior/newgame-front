import { myApi } from "../../service/api/api";

export function handleChange(setUserForm) {
  return (e) => {
    const { name, value } = e.target;

    setUserForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
}

export async function handleSave(token, userId, saveUser, userData) {
  console.log("token", token);
  console.log("userData", userData);

  try {
    const response = await myApi.post(`/editUser/${userId}`, userData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      console.log("response", response);
      const data = response.data;
      saveUser(data.user);
      const message = data.msg;
      const datas = {
        message: message,
        user: data.user,
        status: response.status,
      };

      return datas;
    }
  } catch (error) {
    console.log(error);
    return error;
  }
}

export async function fetchProjectsUser(token, userId) {
  const response = await myApi.get(`user/projects/${userId}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (response.status === 200) {
    console.log(response.data);
    return false;
    return response.data.project;
  }
}

export async function getPaymentProjects(token, userId){
  try {
    const response = await myApi.get(`/payment/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
    if(response.status === 200){
      console.log(response);
      return response.data;
    }
  } catch (error){
    console.log(error);
  }
}
