import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../assets/Context/TokenContext.jsx";
import { UserContext } from "../../assets/Context/UserContext.jsx";
import img from "../../Img/icon_dark.png";
import { myApi } from "../../api/api.js";
import Modal from "../../components/Projects/Modal/ModalConfirmation.jsx";

const Login = () => {
  const navigate = useNavigate();
  const { saveToken } = useContext(TokenContext);
  const { saveUser } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [modal, setModal] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

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
        console.log(response);
        console.log("Token:", response.data.token);
        console.log("user:", response.data.user);
        saveUser(response.data.user);
        saveToken(response.data.token);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setMessage(response.data.msg);
        setModal(true);
        const timer = setTimeout(() => {
          clearTimeout(timer);
          setModal(false);
          navigate("../");
        }, 2000);
      }
    } catch (error) {
      console.error("Erro ao fazer login", error);
    }
  };

  useEffect(() => {
    console.log(formData);
  });

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 relative overflow-hidden bg-transparent bg-fundo ">
      {modal && <Modal message={message} onClose={() => setModal(false)} />}
      <div className="flex flex-col items-center mb-6 bg-white border-solid border-black p-6 border-2 rounded-lg">
        <img src={img} alt="Logo" className="w-25 h-24 mb-2" />{" "}
        {/* Substitua com a URL do logo */}
        <h1 className="text-green-600 text-5xl font-geo">New Game</h1>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-black font-geo text-xl">E-mail:</label>
            <input
              type="text"
              onChange={handleChange}
              name="email"
              placeholder="Digite seu E-mail"
              className="w-96 h-8 px-3 py-2 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-inside-input"
            />
          </div>
          <div>
            <label className="block text-black font-geo text-xl">Senha:</label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              placeholder="Digite sua Senha"
              className="w-96 h-8 px-3 py-4 mb-4 border border-green-500 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 bg-inside-input"
            />
          </div>

          <button
            type="submit"
            className="font-outfit w-full py-2 mt-4 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500"
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
            <Link
              to="../register"
              className="text-green-600 hover:text-green-500 font-bold"
            >
              Cadastre-se
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
        </form>
      </div>
    </div>
  );
};

export default Login;
