import React from "react";
import BackgroundImage from "../assets/img/fundo.jpg";

export const Background = ({ children }) => {
  return (
    <div
      className="w-full h-full min-h-full bg-cover bg-center absolute inset-0 -z-10"
      style={{ backgroundImage: `url(${BackgroundImage})` }}
    >
      {children}
    </div>
  );
};
