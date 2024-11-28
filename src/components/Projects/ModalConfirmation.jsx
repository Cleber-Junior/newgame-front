// Modal.js
import React, { useEffect } from "react";

const Modal = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-24 right-8 z-50 flex items-center">
      <div
        className="bg-white border-4 border-green-600 rounded-lg p-4 text-black font-semibold shadow-md
          transform transition-transform duration-500 ease-out translate-x-0"
        style={{
          animation: "slideIn 0.5s forwards, slideOut 0.5s 2.5s forwards",
        }}
      >
        {message}
      </div>
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(0);
          }
        }
        @keyframes slideOut {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Modal;
