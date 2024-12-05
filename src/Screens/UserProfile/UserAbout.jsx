import React from "react";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import ProfileNav from "../../components/Profile/ProfileNav";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const UserAbout = () => {
  const { user } = React.useContext(UserContext);
  const { token } = React.useContext(TokenContext);

  console.log("user", user);

  return (
    <ProfileNav>
      <div class="px-8 py-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4">Descrição</h2>
        <ReactQuill
          theme="bubble"
          readOnly={true}
          class="text-gray-600 leading-7"
          value={user.about || "No momento você não escreveu nada sobre você."}
        />
      </div>
    </ProfileNav>
  );
};

export default UserAbout;
