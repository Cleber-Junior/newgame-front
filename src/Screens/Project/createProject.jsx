import React, { useContext, useEffect, useState } from "react";
import { TokenContext } from "../../assets/Context/TokenContext";
import { UserContext } from "../../assets/Context/UserContext";
import { Link, useNavigate } from "react-router-dom";
import { myApi } from "../../api/api";

const createProject = () => {
  const { token } = useContext(TokenContext);
  const { user } = useContext(UserContext);
  const navigation = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    formData.append("id_creator", user.id);

    // for (let [key, value] of formData2.entries()) {
    //   console.log(key, value);
    // }

    console.log(formData.forEach((value, key) => console.log(key, value)));

    try {
      const response = await myApi.post("/createProject", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response) {
        console.log("Projeto criado com sucesso", response);
        alert("Projeto criado com sucesso");

        const timer = setTimeout(() => {
          clearTimeout(timer);
          navigation("../edit");
        }, 1000);
      }
    } catch (error) {
      console.error("Erro ao criar projeto", error);
    }
  };

  return (
    <div>
      <h1>Criar Projeto</h1>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="name">Nome do Projeto:</label>
        <input type="text" placeholder="Nome do Projeto" name="name" />
        <br />
        <button type="submit">Registrar Projeto </button>
      </form>
      <Link to="/">Voltar</Link>
    </div>
  );
};

export default createProject;
