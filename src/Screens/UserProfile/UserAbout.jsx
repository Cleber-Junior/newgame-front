import React from "react";
import { Link } from "react-router-dom";
import { myApi } from "../../api/api";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import background from "../../assets/img/profile_background.png";

const UserAbout = () => {
  const { user } = React.useContext(UserContext);
  const { token } = React.useContext(TokenContext);

  console.log("user", user);

  return (
    <div class="min-h-screen bg-gray-100">
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
            <img
              src="https://via.placeholder.com/100"
              alt="Foto do Usuário"
              class="rounded-full border-4 border-white shadow-lg"
            />
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <h1 class="text-2xl font-bold text-gray-800">{user.name}</h1>
      </div>

      <nav class="mt-4 flex justify-center space-x-8 border-b border-gray-300">
        <a
          href="#apoiados"
          class="text-gray-600 hover:text-green-600 px-4 py-2 border-b-4 border-transparent hover:border-green-600"
        >
          Apoiados
        </a>
        <Link
          to={"../projects"}
          class="text-gray-600 hover:text-green-600 px-4 py-2 border-b-4 border-transparent hover:border-green-600"
        >
          Criados
        </Link>
        <a
          href="#perfil"
          class="text-gray-600 hover:text-green-600 px-4 py-2 border-b-4 border-transparent hover:border-green-600"
        >
          Perfil Público
        </a>
        <a
          href="#sobre"
          class="text-green-600 px-4 py-2 border-b-4 border-green-600 font-bold"
        >
          Sobre
        </a>
      </nav>

      <div class="px-8 py-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Descrição</h2>
        <p class="text-gray-600 leading-7">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
          volutpat augue. Maecenas laoreet, neque at hendrerit lobortis, libero
          dolor tristique ex, sit amet aliquet felis dolor id neque. Lorem ipsum
          dolor sit amet, consectetur adipiscing elit. Integer a volutpat augue.
          Maecenas laoreet, neque at hendrerit lobortis.
        </p>
      </div>
    </div>
  );
};

export default UserAbout;
