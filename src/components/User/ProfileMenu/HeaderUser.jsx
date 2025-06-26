import React, { useEffect, useState } from "react";
import { UserContext } from "../../../assets/Context/UserContext";
import { TokenContext } from "../../../assets/Context/TokenContext";
import { Link, useNavigate } from "react-router-dom";
import PlaceholderUser from "../../../assets/img/UserIcon.jpg";
import VisualHeader from "./VisualHeader";

const HeaderUser = ({ dataUser }) => {
  const { saveUser } = React.useContext(UserContext);
  const { saveToken } = React.useContext(TokenContext);
  const selectRef = React.useRef();
  const [open, setOpen] = useState(false);
  const user = dataUser;
  const navigate = useNavigate();

  const handleClickModal = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  function handleLogout() {
    localStorage.clear();
    saveUser(null);
    saveToken(null);
    navigate("/");
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div onClick={handleClickModal} className="relative">
      <VisualHeader
        userImage={user.image}
        userUsername={user.username}
        PlaceholderUser={PlaceholderUser}
      />
      {open && (
        <div
          ref={selectRef}
          className="absolute right-0 mt-2 w-60 px-5 py-3 bg-white text-black rounded-lg shadow border border-transparent z-50"
        >
          <ul className="space-y-3">
            <Link to={"/project/create"}>
              <li className="font-medium sm:hidden">
                <a
                  href=""
                  className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-green-500"
                >
                  {" "}
                  Criar Projeto
                </a>
              </li>
            </Link>
            <Link to={"./user/supported"}>
              <li className="font-medium">
                <a
                  href=""
                  className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-green-500"
                >
                  Projetos Apoiados
                </a>
              </li>
            </Link>
            <Link to={"./user/projects"}>
              <li className="font-medium">
                <a
                  href="#"
                  className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-green-500"
                >
                  Meus Projetos
                </a>
              </li>
            </Link>
            <Link to={"./user/public"}>
              <li className="font-medium">
                <a
                  href="#"
                  className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-green-500"
                >
                  Perfil
                </a>
              </li>
            </Link>
            <Link to={"./user/about"}>
              <li className="font-medium">
                <a
                  href=""
                  className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-green-500"
                >
                  Sobre
                </a>
              </li>
            </Link>

            <hr className="border-gray-700" />
            <li
              className="font-medium cursor-pointer"
              onClick={() => handleLogout}
            >
              <a
                onClick={handleLogout}
                className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
              >
                <div className="mr-3 text-red-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    ></path>
                  </svg>
                </div>
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderUser;
