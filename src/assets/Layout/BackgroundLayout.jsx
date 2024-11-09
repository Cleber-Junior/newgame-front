import React from 'react';
import { Outlet } from 'react-router-dom';
import backgroundImage from '../../assets/img/fundo.jpg';

const BackgroundLayout = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-200 relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center -z-10"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      ></div>
      <div className="relative z-10">
        <Outlet />
      </div>
    </div>
  );
};

export default BackgroundLayout;