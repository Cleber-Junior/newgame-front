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
    <Screen>
      <Container>
        <h1>Cadastro</h1>
        {message && <p style={{ color: "green" }}>{message}</p>}
        <Divform onSubmit={handleSubmit}>
          <DivsignUp>
            <Label htmlFor="name">Name:</Label>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </DivsignUp>
          <DivsignUp>
            <Label htmlFor="username">Username:</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </DivsignUp>
          <DivsignUp>
            <Label htmlFor="email">Email:</Label>
            <Input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </DivsignUp>
          <DivsignUp>
            <Label htmlFor="password">Senha:</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </DivsignUp>
          <Cadastrar type="Submit"> Cadastrar-se</Cadastrar>
        </Divform>
        <p>
          Já possui uma conta?{" "}
          <Link style={{ textDecoration: "none" }} to="../Login">
            <Span>Entre</Span>
          </Link>
        </p>
      </Container>
    </Screen>
  );
};

export default Register;
