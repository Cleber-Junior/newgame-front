import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { myApi } from "../../service/api/api";
import { ToastContainer, toast } from "react-toastify";
import GenericField from "../../components/Common/Forms/GenericField";

const Register = () => {
  const [errorMessage, setErrorMessage] = useState({});
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await myApi.post("/register", formData);
      if (response.status === 201) {
        console.log("Usuário cadastrado com sucesso", response.data);
        toast.success(response.data.msg);
        const Timer = setTimeout(() => {
          navigate("../login");
          clearTimeout(Timer);
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro", error);
      const errors = error.response.data.errors;
      setErrorMessage({
        name: errors.name ? errors.name[0] : "",
        username: errors.username ? errors.username[0] : "",
        email: errors.email ? errors.email[0] : "",
        password: errors.password ? errors.password[0] : "",
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      clearTimeout(timer);
      setErrorMessage({});
    }, 4000);
  });

  return (
    <div className="flex items-center justify-center min-h-screen relative overflow-hidden bg-fundo">
      <ToastContainer autoClose={1000} />
      <div className="flex flex-col items-center p-6 mx-auto w-auto bg-white border-solid border-black border-2 rounded-lg">
        <h1 className="text-green-600 text-5xl font-geo mb-4">Cadastro</h1>
        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center mb-2 font-geo"
        >
          <div className="mb-4">
            <label htmlFor="username" className="block text-black text-xl">
              Username:
            </label>
            <GenericField
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Digite seu Username"
              style={
                "w-96 h-8 px-3 py-4 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-inside-input"
              }
            />
            {errorMessage.username && (
              <p className="text-red-600 text-xs font-outfit">
                {errorMessage.username}
              </p>
            )}
          </div>

          <div className=" mb-4">
            <label htmlFor="email" className="block text-black text-xl">
              Email:
            </label>
            <GenericField
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Digite seu E-mail"
              style={
                "w-96 h-8 px-3 py-4 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-inside-input"
              }
            />
            {errorMessage.email && (
              <p className="text-red-600 text-xs font-outfit">
                {errorMessage.email}
              </p>
            )}
          </div>

          <div className=" mb-4">
            <label htmlFor="password" className="block text-black text-xl">
              Senha:
            </label>
            <GenericField
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Digite sua Senha"
              style={
                "w-96 h-8 px-3 py-4 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-inside-input"
              }
            />
            {errorMessage.password && (
              <p className="text-red-600 text-xs font-outfit">
                {errorMessage.password}
              </p>
            )}
          </div>

          <button
            type="submit"
            className="font-geo text-xl w-3/4 h-10 bg-green-600 text-white rounded-md mt-4 mb-2 hover:bg-green-800"
          >
            Cadastrar-se
          </button>
        </form>

        <p className="text-center text-gray-600 mt-4 font-outfit">
          Já possui uma conta?{" "}
          <Link
            to="../login"
            className="text-green-600 hover:text-green-500 font-bold"
          >
            Entre
          </Link>
        </p>
        <p className="text-center text-gray-600 mt-4 font-outfit">
          Pagina{" "}
          <Link
            to={"../"}
            className="text-green-600 hover:text-green-500 font-bold"
          >
            Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
