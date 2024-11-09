import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../assets/Context/UserContext";
import { TokenContext } from "../assets/Context/TokenContext";
import HeaderUser from "../components/ProfileMenu/HeaderUser";
import logo_header from "../Img/Logo_Header.svg";

const Header = () => {
  const { user, saveUser } = React.useContext(UserContext);
  const { token, saveToken } = React.useContext(TokenContext);


  return (
    <header className="bg-header-bg text-white flex justify-between items-center p-4 text-2xl font-geo">
      <div className="flex items-center space-x-4">
        <Link to="/">
          <img src={logo_header} alt="Logo" className="w-[225px] h-[57px]" />
        </Link>
        <Link
          to="/project/create"
          className="text-white ml-4 hover:text-green-500"
        >
          Criar Projeto
        </Link>
      </div>

      <div className="flex flex-1 justify-center">
        <input
          type="text"
          placeholder="Barra de Pesquisa"
          className="w-3/5 p-2 rounded-lg text-black"
        />
      </div>

      <div className="flex items-center space-x-4">
        {token ? (
          <>
            <HeaderUser dataUser={user} />
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-green-500">
              Login
            </Link>
            <Link to="/register" className="hover:text-green-500">
              Cadastrar-se
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
