import React, { useEffect } from "react";
import { UserContext } from "../../assets/Context/UserContext";
import ProfileNav from "../../components/Profile/ProfileNav";
import PlaceholderIcon from "../../assets/img/UserIcon.jpg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import Modal from "../../components/Modal/ModalConfirmation";

const UserPublicProfile = () => {
  const { user, handleSave } = React.useContext(UserContext);
  const [modal, setModal] = React.useState(false);
  const [modalMessage, setModalMessage] = React.useState("");
  const [userData, setUserData] = React.useState({
    id: user.id,
    username: user.username,
    about: user.about,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // try {
    //   const updateUser = await handleSave(e, formData);
    //   console.log(updateUser);
    //   setModalMessage(updateUser.message);
    //   setModal(true);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  const handleChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  return (
    <ProfileNav>
      <form className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-100 rounded-lg shadow-md m-5">
        {modal && (
          <Modal message={modalMessage} onClose={() => setModal(false)} />
        )}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-lg font-medium text-gray-700"
          >
            E-mail
          </label>
          <p className="text-sm text-gray-500">
            Aqui, caso necessario você pode alterar o e-mail de sua conta.
          </p>
          <div className="flex items-center space-x-4">
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              className="w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="usuario@email.com"
            />
            <p className="text-green-700 cursor-pointer text-xs">
              Alterar Email
            </p>
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
              name="username"
              value={userData.username}
              onChange={handleChange}
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
              value={userData.about}
              className="bg-white"
              onChange={(value) => setUserData({ ...userData, about: value })}
              style={{ height: "300px" }}
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
            <div className="w-40 h-40 flex items-center justify-center rounded-md">
              <img
                src={PlaceholderIcon || userData.image}
                type="file"
                id="image"
                name="image"
                alt="Imagem de Perfil"
              />
            </div>

            {/* Input de arquivo */}
            <input
              type="file"
              name="image"
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-gray-200"
            />
          </div>
        </div>

        {/* Botão Salvar */}
        <div className="flex justify-end">
          <button
            onClick={(e) => handleSubmit(e)}
            className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          >
            Salvar
          </button>
        </div>
      </form>
    </ProfileNav>
  );
};

export default UserPublicProfile;
