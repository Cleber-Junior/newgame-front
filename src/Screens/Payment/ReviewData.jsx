import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import GenericField from "../../components/Common/Forms/GenericField";
import GenericSelect from "../../components/Common/Forms/GenericSelect";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import { handleChange } from "../../Utils/UtilsUser/UtilsUser";
import { getCep, handlePayment } from "../../Utils/UtilsRewards/UtilsReward";
import SaveButton from "../../components/Common/SaveButton";
import { fetchApiState } from "../../service/api/apiState";
import { use } from "react";

const ReviewData = () => {
  const location = useLocation();
  const { token } = useContext(TokenContext);
  const { user, saveUser } = useContext(UserContext);
  const { idProject, rewardData } = location.state || {};
  const [userForm, setUserForm] = useState(user);
  const [state, setState] = useState([]);

  const handlePay = async () => {
    try {
      const response = await handlePayment(
        token,
        idProject,
        rewardData,
        user.id,
        saveUser,
        userForm
      );
      console.log("response", response);
      if (response.status === 201) {
        window.open(response.data.reference, "_blank");
        const Timer = setTimeout(() => {
          window.location.href = "../user/supported";
          clearTimeout(Timer);
        }, 5000);
      }
    } catch (error) {
      console.error("Error during payment:", error);
    }
  };

  useEffect(() => {
    const fetchCepData = async (cep) => {
      const response = await getCep(cep);
      console.log(response);
      if (response) {
        setUserForm((prev) => ({
          ...prev,
          // Apenas atualiza os campos se estiverem vazios
          street: prev.street || response.logradouro,
          neighborhood: prev.neighborhood || response.bairro,
          city: prev.city || response.localidade,
          state: prev.state || response.uf,
        }));
      }
    };

    if (userForm.zip_code) {
      const cep = userForm.zip_code.replace(/\D/g, "");
      if (cep && cep.length === 8) {
        fetchCepData(cep);
      }
    }
  }, [userForm.zip_code]);

  useEffect(() => {
    fetchApiState()
      .then((data) => {
        if (data) {
          setState(data);
        } else {
          console.error("Failed to fetch state data.");
        }
      })
      .catch((error) => {
        console.error("Error fetching state data:", error);
      });
  }, []);

  useEffect(() => {
    console.log("userForm", userForm);
  }, [userForm]);

  return (
    <div className="max-w-screen-lg mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4">
        Preencha e revise os dados para pagamento
      </h2>
      <p className="text-sm text-gray-500 mb-6">* Preenchimento obrigatório</p>

      {/* Layout principal com grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
        {/* Formulário de dados do usuário */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Campo Nome Completo */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nome completo *
              </label>
              <GenericField
                name={"fullname"}
                type={"text"}
                value={userForm.fullname}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>

            {/* Campo CPF/CNPJ */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                CPF/CNPJ *
              </label>
              <GenericField
                name={"cpf"}
                type={"text"}
                value={userForm.cpf}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                mask={"999.999.999-99"}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Data de Nascimento
              </label>
              <GenericField
                name={"birth_date"}
                type={"date"}
                value={userForm.birth_date}
                onChange={handleChange(setUserForm)}
                style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
              />
            </div>
          </div>

          {/* Campos de endereço */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Endereço</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  CEP *
                </label>
                <GenericField
                  name={"zip_code"}
                  type={"text"}
                  value={userForm.zip_code}
                  onChange={handleChange(setUserForm)}
                  style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                  mask={"99999-999"}
                  placeholder="Digite apenas números"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Endereço (Rua, Avenida, etc) *
                </label>
                <GenericField
                  name={"street"}
                  type={"text"}
                  value={userForm.street}
                  onChange={handleChange(setUserForm)}
                  style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Número *
                </label>
                <GenericField
                  name={"number"}
                  type={"text"}
                  value={userForm.number}
                  onChange={handleChange(setUserForm)}
                  style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
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
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Bairro *
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
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Cidade *
                </label>
                <GenericField
                  name={"city"}
                  type={"text"}
                  value={userForm.city}
                  onChange={handleChange(setUserForm)}
                  style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Estado *
                </label>
                <GenericSelect
                  options={state}
                  onSelect={(value) =>
                    setUserForm((prev) => ({ ...prev, state: value }))
                  }
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Telefone *
                </label>
                <GenericField
                  name={"cellphone"}
                  type={"text"}
                  value={userForm.cellphone}
                  onChange={handleChange(setUserForm)}
                  style="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 w-full"
                  mask={"(99) 99999-9999"}
                />
              </div>
            </div>
          </div>
          <div className="w-full flex justify-center mt-6">
            <SaveButton
              handleSave={handlePay}
              style={
                "px-24 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
              }
              message={"Proximo Passo"}
            />
          </div>
        </div>

        {/* Resumo do apoio */}
        <div className="p-6 border rounded-lg shadow-md bg-gray-50 self-start">
          <h3 className="text-lg font-semibold text-gray-800">
            Resumo do apoio
          </h3>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Valor do apoio:</span> R${" "}
            {rewardData?.value || "0,00"}
          </p>
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Recompensa selecionada:</span>{" "}
            {rewardData?.name || "Nenhuma recompensa selecionada"}
          </p>
          <p className="mt-2 text-gray-500 text-sm">
            {rewardData?.description || "Descrição não disponível."}
          </p>
          <Link
            to={`../../project/rewards/${idProject}`}
            state={{ idProject: idProject }}
            className="mt-4 text-green-500 hover:underline"
          >
            Editar recompensa
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReviewData;
