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

const Register = () => {
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

    axios
      .post("http://127.0.0.1:8000/api/register", formData)
      .then((response) => {
        console.log("Usuário Cadastrado com sucesso", formData);
        navigate("../Login");
      })
      .catch((error) => {
        console.log("Erro ao cadastrar usuário", error);
      });
  };

  return (
    <Screen>
      <Container>
        <h1>Cadastro</h1>
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
