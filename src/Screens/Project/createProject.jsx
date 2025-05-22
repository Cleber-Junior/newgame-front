import { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../assets/Context/TokenContext";
import { UserContext } from "../../assets/Context/UserContext";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { myApi } from "../../service/api/api";
import ErrorTokenScreen from "../../components/Common/ErrorTokenScreen";

const CreateProject = () => {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const navigation = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    id_creator: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedForm = {
      ...formData,
      id_creator: user.id,
    };

    try {
      const response = await myApi.post("/createProject", updatedForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 201) {
        console.log("Projeto criado com sucesso", response);
        toast.success(response.data.msg);
        const Timer = setTimeout(() => {
          clearTimeout(Timer);
          navigation("../../user/projects");
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao criar projeto", error);
      toast.error(error.response.data.message);
    }
  };

  if (!token) {
    return <ErrorTokenScreen />;
  }

  return (
    <div className="flex items-center justify-center h-[100%]">
      <ToastContainer autoClose={1000} />
      <div className="w-full max-w-md p-8 bg-gray-100 rounded shadow-lg">
        <h1 className="text-2xl font-bold text-center text-green-500 mb-6">
          Cadastrar Novo Projeto
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="projectName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nome do Projeto:
            </label>
            <input
              type="text"
              id="projectName"
              name="name"
              placeholder="Digite o nome do projeto"
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-green-500 text-white font-semibold rounded hover:bg-green-600 transition duration-300"
          >
            Registrar Projeto
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
