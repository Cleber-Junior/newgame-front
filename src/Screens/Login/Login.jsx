import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../assets/Context/TokenContext.jsx";
import { UserContext } from "../../assets/Context/UserContext.jsx";
import img from "../../Img/icon_dark.png";
import { myApi } from "../../api/api.js";
import backgroundImage from "../../assets/img/fundo.jpg";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const { saveToken } = useContext(TokenContext);
  const { saveUser } = useContext(UserContext);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await myApi.post("/login", formData);
      if (response.status === 200) {
        console.log("Token:", response.data.token);
        console.log("user:", response.data.user);
        saveUser(response.data.user);
        saveToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));

        const timer = setTimeout(() => {
          clearTimeout(timer);
          navigate("../");
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  useEffect(() => {
    console.log(formData);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 relative overflow-hidden bg-transparent">
      <div className="flex flex-col items-center mb-6">
        <img src={img} alt="Logo" className="w-25 h-24 mb-2" />{" "}
        {/* Substitua com a URL do logo */}
        <h1 className="text-green-600 text-5xl font-geo">New Game</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-gray-700 font-geo">E-mail</label>
            <input
              type="text"
              onChange={handleChange}
              name="email"
              className="w-96 h-8 px-3 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-inside-input"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-geo">Senha</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              className="w-96 h-8 px-3 py-4 mb-4 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-inside-input"
            />
          </div>

          {/* Botão de Login */}
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Conectar-se
          </button>
          <div class="flex items-center justify-center w-full my-4">
            <div class="border-t border-gray-400 flex-grow mr-3"></div>
            <span class="text-gray-600 font-bold text-sm">Ou</span>
            <div class="border-t border-gray-400 flex-grow ml-3"></div>
          </div>

          {/* Link para cadastro */}
          <p className="text-center text-gray-600 mt-4 font-outfit">
            Não possui uma conta?{" "}
            <Link to="../register" className="text-green-600 hover:underline font-bold">
              Cadastre-se
            </Link>
          </p>
          <p className="text-center text-gray-600 mt-4">
            Pagina{" "}
            <Link to={"../"} className="text-green-600 hover:underline">
              Home
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
