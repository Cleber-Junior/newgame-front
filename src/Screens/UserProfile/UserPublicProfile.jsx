import React from "react";
import ProfileNav from "../../components/Profile/ProfileNav";
import PlaceholderIcon from "../../assets/img/UserIcon.jpg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const UserPublicProfile = () => {
  return (
    <ProfileNav>
      <div className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-100 rounded-lg shadow-md m-5">
        {/* Campo de Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            E-mail
          </label>
          <p className="text-sm text-gray-500">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer a
            volutpat augue.
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="email"
              id="email"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="usuario@email.com"
            />
          </div>
        </div>

        {/* Campo de Nome Público */}
        <div className="space-y-2">
          <label
            htmlFor="publicName"
            className="block text-lg font-medium text-gray-700"
          >
            Nome público do perfil
          </label>
          <p className="text-sm text-gray-500">
            Este será o nome que os usuários verão em seu perfil.
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="text"
              id="publicName"
              className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Seu nome público"
            />
          </div>
        </div>

        {/* Campo Sobre */}
        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            Sobre
          </label>
          <div className="border border-gray-300 rounded-md overflow-hidden">
            <ReactQuill
              theme="snow"
              name="description"
              className="bg-white"
              style={{ height: "300px" }} // Define a altura fixa
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-lg font-medium text-gray-700">
            Imagem do perfil
          </label>
          <p className="text-sm text-gray-500">
            Essa imagem será utilizada como a miniatura de seu perfil (PNG, JPG
            tamanho 280 x 280)
          </p>
          <div className="flex flex-col items-center space-y-4">
            {/* Imagem de pré-visualização */}
            <div className="w-40 h-40 bg-green-400 flex items-center justify-center rounded-md">
              <img src={PlaceholderIcon} alt="Imagem de Perfil" />
            </div>

            {/* Input de arquivo */}
            <input
              type="file"
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <button className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600">
            Salvar
          </button>
        </div>
      </div>
    </ProfileNav>
  );
};

export default UserPublicProfile;
