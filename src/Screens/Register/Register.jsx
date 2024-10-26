import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  DivsignUp,
  Divform,
  Cadastrar,
  Input,
  Label,
  Screen,
  Container,
  Span,
} from "./RegisterStyles";
import { myApi } from "../../api/api";

const Register = () => {
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await myApi.post("/register", formData);
      if (response.status === 201) {
        console.log("Usuário cadastrado com sucesso", response.data);
        setMessage(response.data.msg);
        const Timer = setTimeout(() => {
          navigate("../Login");
          clearTimeout(Timer);
        }, 3000);
      }
    } catch (error) {
      console.error("Erro ao fazer cadastro", error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-12">
      <div className="flex flex-col items-center p-6 mx-auto w-[400px] border-4 border-black rounded-lg bg-white">
        <h1 className="text-2xl font-bold mb-4">Cadastro</h1>
        {message && <p className="text-green-600">{message}</p>}

        <form
          onSubmit={handleSubmit}
          className="w-full flex flex-col items-center mb-2"
        >
          <div className="w-3/4 mb-4">
            <label htmlFor="name" className="block text-lg">
              Nome:
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full p-1 bg-green-100 border border-green-600 rounded-md"
            />
          </div>

          <div className="w-3/4 mb-4">
            <label htmlFor="username" className="block text-lg">
              Username:
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full p-1 bg-green-100 border border-green-600 rounded-md"
            />
          </div>

          <div className="w-3/4 mb-4">
            <label htmlFor="email" className="block text-lg">
              Email:
            </label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-1 bg-green-100 border border-green-600 rounded-md"
            />
          </div>

          <div className="w-3/4 mb-4">
            <label htmlFor="password" className="block text-lg">
              Senha:
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full p-1 bg-green-100 border border-green-600 rounded-md"
            />
          </div>

          <button
            type="submit"
            className="font-geo text-xl w-3/4 h-10 bg-green-600 text-white rounded-md mt-4 mb-2 hover:bg-green-800"
          >
            Cadastrar-se
          </button>
        </form>

        <p>
          Já possui uma conta?{" "}
          <Link to="../Login" className="text-green-600 hover:text-green-800">
            Entre
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
