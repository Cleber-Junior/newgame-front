import React from "react";
import background from "../../assets/img/profile_background.png";
import PlaceholderIcon from "../../assets/img/UserIcon.jpg";
import { Link, useLocation } from "react-router-dom";
import { UserContext } from "../../assets/Context/UserContext";

const ProfileNav = ({ children }) => {
  const { user } = React.useContext(UserContext);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  return (
    <div>
      <div class="bg-green-700 h-48 relative">
        <div class="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 opacity-80">
          <img
            src={background}
            alt="Background"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="relative flex justify-center items-center">
          <div class="absolute top-12">
            {user.image === null ? (
              <img
                src={PlaceholderIcon}
                alt="Foto do Usuário"
                class="rounded-full border-4 border-white shadow-lg w-28"
              />
            ) : (
              <img
                src={user.image}
                alt="Foto do Usuário"
                class="rounded-full border-4 border-white shadow-lg"
              />
            )}
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <h1 class="text-2xl font-bold text-gray-800">{user.username}</h1>
      </div>

      <nav class="mt-4 flex justify-center space-x-8 border-b border-gray-300">
        <Link
          to="/user/supported"
          className={`text-gray-600 hover:text-green-600 px-4 py-2 border-b-4 ${
            isActive("/user/supported")
              ? "border-green-600 text-green-600 font-bold"
              : "border-transparent"
          }`}
        >
          Apoiados
        </Link>
        <Link
          to={"../../user/projects"}
          className={`text-gray-600 hover:text-green-600 px-4 py-2 border-b-4 ${
            isActive("/user/projects")
              ? "border-green-600 text-green-600 font-bold"
              : "border-transparent"
          }`}
        >
          Criados
        </Link>
        <Link>
          <a
            href={"../../user/public"}
            className={`text-gray-600 hover:text-green-600 px-4 py-2 border-b-4 ${
              isActive("/user/public")
                ? "border-green-600 text-green-600 font-bold"
                : "border-transparent"
            }`}
          >
            Perfil Público
          </a>
        </Link>
        <Link
          to={"../../user/about"}
          className={`text-gray-600 hover:text-green-600 px-4 py-2 border-b-4 ${
            isActive("/user/about")
              ? "border-green-600 text-green-600 font-bold"
              : "border-transparent"
          }`}
        >
          Sobre
        </Link>
      </nav>
      {children}
    </div>
  );
};

export default ProfileNav;
