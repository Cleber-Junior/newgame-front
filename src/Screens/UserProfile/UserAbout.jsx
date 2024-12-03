import React from "react";
import { Link } from "react-router-dom";
import { myApi } from "../../api/api";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import background from "../../assets/img/profile_background.png";
import PlaceholderIcon from "../../assets/img/UserIcon.jpg";
import ProfileNav from "../../components/Profile/ProfileNav";

const UserAbout = () => {
  const { user } = React.useContext(UserContext);
  const { token } = React.useContext(TokenContext);

  console.log("user", user);

  return (
    <ProfileNav>
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
    </ProfileNav>
  );
};

export default UserAbout;
