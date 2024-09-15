import React from "react";
import { Link } from "react-router-dom";
import { Screen, Nav, Botoes, Img } from "../assets/css/HeaderStyle";
import img from "../assets/img/icon_placeholder.jpg";

const Header = () => {
  return (
    <Screen>
      <Nav>
        <Link style={{ textDecoration: "none" }} to="/">
          <Botoes>Home </Botoes>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/project/create">
          <Botoes>Criar Projetos</Botoes>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/login">
          <Botoes>
            Login <Img src={img} alt="" />
          </Botoes>
        </Link>
        <Link style={{ textDecoration: "none" }} to="Register">
          <Botoes>Cadastrar-se</Botoes>
        </Link>
      </Nav>
    </Screen>
  );
};

export default Header;
