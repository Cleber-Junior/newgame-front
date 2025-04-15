import React from "react";
import { Link } from "react-router-dom";

const ErrorTokenScreen = () => {
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-4xl font-semibold text-center">
          Você não está logado
        </h1>
        <p className="mt-[2px] text-center">
          Faça{" "}
          <Link to={"../../login"} className="text-green-500 font-bold">
            Login
          </Link>{" "}
          para acessar essa página
        </p>
      </div>
    </div>
  );
};

export default ErrorTokenScreen;
