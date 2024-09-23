import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../assets/Context/UserContext";
import { TokenContext } from "../assets/Context/TokenContext";
import { Screen, Nav, Botoes, Img } from "../assets/css/HeaderStyle";
import img from "../assets/img/icon_placeholder.jpg";

const Header = () => {
  const { user, saveUser } = React.useContext(UserContext);
  const { token, saveToken } = React.useContext(TokenContext);

  function handleLogout() {
    localStorage.clear();
    saveUser(null);
    saveToken(null);
  }

  return (
    <Screen>
      <Nav>
        <Link style={{ textDecoration: "none" }} to="/">
          <Botoes>Home </Botoes>
        </Link>
        <Link style={{ textDecoration: "none" }} to="/project/create">
          <Botoes>Criar Projetos</Botoes>
        </Link>
        {token ? (
          <>
            <Link style={{ textDecoration: "none" }} to="/user/profile">
              <Botoes>
                {user.name}
                <Img src={img} alt="" />
              </Botoes>
            </Link>
            <Botoes onClick={handleLogout}>Logout</Botoes>
          </>
        ) : (
          <>
            <Link style={{ textDecoration: "none" }} to="/login">
              <Botoes>
                Login <Img src={img} alt="" />
              </Botoes>
            </Link>
            <Link style={{ textDecoration: "none" }} to="Register">
              <Botoes>Cadastrar-se</Botoes>
            </Link>
          </>
        )}
      </Nav>
    </Screen>
  );
};

export default Header;
