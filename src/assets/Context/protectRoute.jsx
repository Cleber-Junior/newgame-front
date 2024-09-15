import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { TokenContext } from "../../assets/Context/TokenContext";

const ProtectRoute = ({ children }) => {
  const { token } = useContext(TokenContext);

  if (!token) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default ProtectRoute;
