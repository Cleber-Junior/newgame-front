import React from "react";
import { Link } from "react-router-dom";
import { myApi } from "../../api/api";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";

const UserProfile = () => {
  const { user } = React.useContext(UserContext);
  const { token } = React.useContext(TokenContext);
  
  return (
    <div>
      <p>Perfil User</p>
    </div>
  );
};

export default UserProfile;
