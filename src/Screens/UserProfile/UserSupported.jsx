import React from "react";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import Loading from "../../components/Projects/Loading";
import ProfileNav from "../../components/Profile/ProfileNav";

const UserSupported = () => {
  const { token } = React.useContext(TokenContext);

  return (
    <ProfileNav>
      <h1 className="text-2xl mt-4 font-semibold text-center">
        Projetos Apoiados
      </h1>
    </ProfileNav>
  );
};

export default UserSupported;
