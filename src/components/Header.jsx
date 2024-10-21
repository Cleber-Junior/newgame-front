import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../assets/Context/UserContext";
import { TokenContext } from "../assets/Context/TokenContext";
import {
  HeaderContainer,
  LogoDivision,
  SearchDivision,
  UserDivision,
  DropDownMenu,
  DropDownItem,
  Input,
  Botoes,
  Img,
  Logo,
} from "../assets/css/HeaderStyle";
import img from "../assets/img/icon_placeholder.jpg";
import logo_header from "../Img/Logo_Header.svg";

const Header = () => {
  const { user, saveUser } = React.useContext(UserContext);
  const { token, saveToken } = React.useContext(TokenContext);

  const [dropDown, setDropDown] = React.useState(false);

  function handleLogout() {
    localStorage.clear();
    saveUser(null);
    saveToken(null);
  }

  function toggleDropDown() {
    setDropDown(!dropDown);
  }

  return (
    <HeaderContainer>
      <LogoDivision>
        <Link style={{ textDecoration: "none" }} to="/">
          <Logo src={logo_header} />
        </Link>
        <Link style={{ textDecoration: "none" }} to="/project/create">
          <Botoes>Criar Projeto</Botoes>
        </Link>
      </LogoDivision>
      <SearchDivision>
        {" "}
        <Input type="text" placeholder="Barra de Pesquisa" />
      </SearchDivision>
      <UserDivision>
        {token ? (
          <>
            <Botoes>
              <Img src={img} alt="Profile" onClick={toggleDropDown} />
              {dropDown && (
                <DropDownMenu>
                  <DropDownItem>
                    <Link style={{ textDecoration: "none" }} to="/user/profile">
                      Perfil
                    </Link>
                  </DropDownItem>
                  <DropDownItem onClick={handleLogout}>Sair</DropDownItem>
                </DropDownMenu>
              )}
            </Botoes>
          </>
        ) : (
          <>
            <Link style={{ textDecoration: "none" }} to="/login">
              <Botoes>Login</Botoes>
            </Link>
            <Link style={{ textDecoration: "none" }} to="Register">
              <Botoes>Cadastrar-se</Botoes>
            </Link>
          </>
        )}
      </UserDivision>
    </HeaderContainer>
  );
};

export default Header;
