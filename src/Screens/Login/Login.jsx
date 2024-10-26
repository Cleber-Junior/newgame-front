import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { TokenContext } from "../../assets/Context/TokenContext.jsx";
import { UserContext } from "../../assets/Context/UserContext.jsx";
import img from "../../Img/icon_dark.png";
import { myApi } from "../../api/api.js";

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
      if (response) {
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

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="flex flex-col items-center p-6 mx-auto w-[400px] border-4 border-black rounded-lg bg-white">
        <div className="text-center text-2xl text-green-600">
          <img className="w-[140px] h-[120px]" src={img} alt="Logo New Game" />
          <h2>New Game</h2>
        </div>

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center mb-2"
        >
          <div className="my-2 w-full">
            <label className="block text-lg">Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-1 mb-4 bg-green-100 border border-green-600 rounded-md"
            />
          </div>

          <div className="my-2 w-full">
            <label className="block text-lg">Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full p-1 mb-4 bg-green-100 border border-green-600 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="font-geo text-xl w-3/4 h-10 bg-green-600 text-white rounded-md mt-4 mb-2 hover:bg-green-800"
          >
            Logar
          </button>
        </form>

        <p>
          Ainda não tem uma conta?{" "}
          <Link
            to="../Register"
            className="text-green-600 hover:text-green-800"
          >
            Cadastre-se
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
