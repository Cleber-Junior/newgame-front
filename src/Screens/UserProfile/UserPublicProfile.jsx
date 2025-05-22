import { useState, useContext, useEffect } from "react";
import { UserContext } from "../../assets/Context/UserContext";
import { handleChange, handleSave } from "../../Utils/UtilsUser/UtilsUser";
import ProfileNav from "../../components/User/Profile/ProfileNav";
import PlaceholderIcon from "../../assets/img/UserIcon.jpg";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { ToastContainer, toast } from "react-toastify";
import GenericField from "../../components/Common/Forms/GenericField";
import SaveButton from "../../components/Common/SaveButton";
import { TokenContext } from "../../assets/Context/TokenContext";

const UserPublicProfile = () => {
  const { user, saveUser } = useContext(UserContext);
  const { token } = useContext(TokenContext);
  const [userForm, setUserForm] = useState(user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateForm = {
      username: userForm.username,
      email: userForm.email,
      image: e.target.image.files[0],
      about: userForm.about,
    };

    try {
      const updateUser = await handleSave(token, user.id, saveUser, updateForm);
      console.log(updateUser);
      toast.success(updateUser.message);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(userForm);

  return (
    <ProfileNav>
      <form
        className="max-w-2xl mx-auto p-4 space-y-6 bg-gray-100 rounded-lg shadow-md m-5"
        onSubmit={handleSubmit}
      >
        <ToastContainer autoClose={1000} />
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
            <GenericField
              type={"email"}
              name={"email"}
              value={userForm.email}
              onChange={handleChange(setUserForm)}
              style={
                "w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              }
              placeholder={"usuario@email.com"}
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
            <GenericField
              type={"text"}
              name={"username"}
              value={userForm.username}
              onChange={handleChange(setUserForm)}
              style={
                "w-1/2 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              }
              placeholder={"Seu nome público"}
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
              value={userForm.about}
              className="bg-white"
              onChange={(value) => setUserForm({ ...userForm, about: value })}
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
              className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-md file:border file:border-gray-300 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700 hover:file:bg-green-600 hover:file:text-white"
              id="image"
            />
          </div>
        </div>

        <SaveButton
          type={"submit"}
          style={
            "px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
          }
          message={"Salvar"}
        />
      </form>
    </ProfileNav>
  );
};

export default UserPublicProfile;
