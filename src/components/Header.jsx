import React from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../assets/Context/UserContext";
import { TokenContext } from "../assets/Context/TokenContext";
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
    <header className="bg-header-bg text-white flex justify-between items-center p-4 text-2xl">
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
            <div className="relative">
              <img
                src={img}
                alt="Profile"
                className="w-[50px] h-[50px] rounded-full cursor-pointer"
                onClick={toggleDropDown}
              />
              {dropDown && (
                <div className="absolute top-16 right-0 bg-white shadow-lg rounded-lg">
                  <div className="hover:bg-gray-200 p-2 cursor-pointer text-black rounded-t-lg">
                    <Link
                      to="/user/profile"
                      className="text-black no-underline"
                    >
                      Perfil
                    </Link>
                  </div>
                  <div
                    className="hover:bg-gray-200 p-2 cursor-pointer text-black rounded-b-lg"
                    onClick={handleLogout}
                  >
                    Sair
                  </div>
                </div>
              )}
            </div>
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
