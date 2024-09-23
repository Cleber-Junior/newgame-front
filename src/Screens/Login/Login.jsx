import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Screen,
  Container,
  Divlogo,
  Logo,
  Divform,
  Label,
  Input,
  Divsign,
  Logar,
  Span,
} from "./LoginStyles.jsx";
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

        alert("Login efetuado com sucesso");
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
    <Screen>
      <Container>
        <Divlogo>
          <Logo className="img" src={img} alt="Logo New Game" />
          <h2>New Game</h2>
        </Divlogo>
        <Divform onSubmit={handleSubmit}>
          <Divsign>
            <Label>Email</Label>
            <Input
              type="text"
              size={"40"}
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </Divsign>
          <Divsign>
            <Label>Senha</Label>
            <Input
              type="password"
              size={"40"}
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </Divsign>
          <Logar type="submit">Logar</Logar>
        </Divform>
        <p>
          Ainda não tem uma conta?{" "}
          <Link style={{ textDecoration: "none" }} to="../Register">
            <Span>Cadastre-se</Span>
          </Link>
        </p>
      </Container>
    </Screen>
  );
};

export default Login;
