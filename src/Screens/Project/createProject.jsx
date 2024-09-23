import React, { useContext, useState } from "react";
import axios from "axios";
import { TokenContext } from "../../assets/Context/TokenContext";
import { UserContext } from "../../assets/Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { myApi } from "../../api/api";

const createProject = () => {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const navigation = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    meta_value: "",
    end_date: "",
    id_creator: user.id,
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
      const response = await myApi.post("/registerProject", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log("Projeto criado com sucesso", response);
        alert("Projeto criado com sucesso");
        navigation("../");

        const timer = setTimeout(() => {
          clearTimeout(timer);
          navigation("../");
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao criar projeto", error);
    }
  };

  return (
    <div>
      <h1>Criar Projeto</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Nome do Projeto:</label>
        <input
          type="text"
          placeholder="Nome do Projeto"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="description">Descrição:</label>
        <textarea
          name="description"
          placeholder="Descrição do Projeto"
          cols="30"
          rows="10"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
        <br />
        <label htmlFor="meta_value">Meta do Projeto:</label>
        <input
          type="text"
          name="meta_value"
          placeholder="Valor"
          value={formData.meta_value}
          onChange={handleChange}
        />
        <br />
        <label htmlFor="end_date">Data Final:</label>
        <input
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
        <br />
        <button type="submit">Registrar Projeto </button>
      </form>
      <Link to="/">Voltar</Link>
    </div>
  );
};

export default createProject;
