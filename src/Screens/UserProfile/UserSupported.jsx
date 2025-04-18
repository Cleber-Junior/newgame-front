import React from "react";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import Loading from "../../components/Common/Loading";
import ProfileNav from "../../components/User/Profile/ProfileNav";

const UserSupported = () => {
  const { token } = React.useContext(TokenContext);

  return (
    <ProfileNav>
      <h1 className="text-2xl mt-4 font-semibold text-center">
        Projetos Apoiados
      </h1>
      <p className="text-center mt-5">Você ainda não apoiou nenhum projeto</p>
    </ProfileNav>
  );
};

export default UserSupported;
