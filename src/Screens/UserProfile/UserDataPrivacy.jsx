import { useState, useEffect, useContext } from "react";
import { handleChange, handleSave } from "../../Utils/UtilsUser/UtilsUser";
import { ToastContainer, toast } from "react-toastify";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import GenericField from "../../components/Common/Forms/GenericField";
import GenericSelect from "../../components/Common/Forms/GenericSelect";
import SaveButton from "../../components/Common/SaveButton";
import ProfileNav from "../../components/User/Profile/ProfileNav";

const UserDataPrivacy = () => {
  const { user, saveUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [userForm, setUserForm] = useState(user);
  const [state, setState] = useState([]);

  console.log(userForm);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const updateUser = await handleSave(
        token,
        userForm.id,
        saveUser,
        userForm
      );
      console.log(updateUser);
      toast.success(updateUser.message);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchState = async () => {
      const response = await fetch("https://brasilapi.com.br/api/ibge/uf/v1")
        .then((res) => res.json())
        .catch((err) => console.log(err));
      if (response) {
        setState(response.map((item) => item));
      }
    };
    fetchState();
  }, []);

  return (
    <ProfileNav>
      <form className="max-w-4xl mx-auto p-4 space-y-6">
        <ToastContainer />
        <div className="max-w-4xl mx-auto p-4 space-y-6 bg-gray-100 rounded-lg shadow-md m-5">
          <h2 className="text-xl font-bold mb-4">Dados Pessoais</h2>
          <p className="text-sm text-gray-500">
            Aqui, você pode alterar os dados pessoais da sua conta.
          </p>
          <div className="grid grid-cols-3 gap-6">
            <div className="flex flex-col w-full">
              <label className="block text-lg font-medium text-gray-700">
                Nome
              </label>
              <GenericField
                name={"name"}
                type={"text"}
                value={userForm.name}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-lg font-medium text-gray-700">
                CPF
              </label>
              <GenericField
                name={"cpf"}
                type={"text"}
                value={userForm.cpf}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-lg font-medium text-gray-700">
                Data de Nascimento
              </label>
              <GenericField
                name={"birth_date"}
                type={"birth_date"}
                value={userForm.birth_date}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6 bg-gray-100 rounded-lg shadow-md m-5">
          <h2 className="text-xl font-bold mb-4">Endereço</h2>
          <p>
            Os dados de endereço serão utilizados para ser possivel efetuar o
            apoio aos financiamento coletivos.
          </p>
          <label
            htmlFor="zip_code"
            className="block text-lg font-medium text-gray-700"
          >
            CEP
          </label>
          <GenericField
            name={"zip_code"}
            type={"text"}
            value={userForm.zip_code}
            onChange={handleChange(setUserForm)}
            style={
              "w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            }
            placeholder={"Digite apenas números"}
          />
          <label
            htmlFor="street"
            className="block text-lg font-medium text-gray-700"
          >
            Endereço (Rua, Avenida, etc)
          </label>
          <GenericField
            name={"street"}
            type={"text"}
            value={userForm.street}
            onChange={handleChange(setUserForm)}
            style={
              "w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            }
          />

          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col w-full">
              <label className="block text-lg font-medium text-gray-700">
                Número
              </label>
              <GenericField
                name={"number"}
                type={"text"}
                value={userForm.number}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-lg font-medium text-gray-700">
                Complemento
              </label>
              <GenericField
                name={"complement"}
                type={"text"}
                value={userForm.complement}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-lg font-medium text-gray-700">
                Bairro
              </label>
              <GenericField
                name={"neighborhood"}
                type={"text"}
                value={userForm.neighborhood}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col w-full">
              <label className="block text-lg font-medium text-gray-700">
                Cidade
              </label>
              <GenericField
                name={"city"}
                type={"text"}
                value={userForm.city}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-lg font-medium text-gray-700">
                Estado
              </label>
              <GenericSelect
                options={state}
                onSelect={handleChange(setUserForm)}
              />
            </div>
            <div className="flex flex-col w-full">
              <label className="block text-lg font-medium text-gray-700">
                Telefone
              </label>
              <GenericField
                name={"cellphone"}
                type={"text"}
                value={userForm.cellphone}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
          </div>
        </div>
        <SaveButton handleSave={handleSubmit} />
      </form>
    </ProfileNav>
  );
};

export default UserDataPrivacy;
