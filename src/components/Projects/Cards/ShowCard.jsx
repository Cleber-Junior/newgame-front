import React from "react";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import "react-quill/dist/quill.bubble.css";

const Card = ({ data }) => {
  const calculateDaysLeft = (endDate) => {
    const today = new Date(); // Data atual
    const targetDate = new Date(endDate); // Data final
    const diffInTime = targetDate - today; // Diferença em milissegundos
    return Math.max(0, Math.ceil(diffInTime / (1000 * 60 * 60 * 24))); // Converte para dias, evita valores negativos
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-center h-80 m-14">
      <Link to={`/project/${data.id}`}>
        <img
          src={data.image}
          alt={data.name}
          className="w-full max-h-[9rem] object-cover rounded-t-2xl"
        />
      </Link>

      <div className="p-4">
        <Link to={`/project/${data.id}`}>
          <h2 className="text-base font-bold text-gray-800 mb-2">
            {data.name}
          </h2>
        </Link>
        <ReactQuill
          className="text-sm text-gray-600 mb-4 line-clamp-2"
          theme="bubble"
          readOnly={true}
          value={data.description}
          style={{ height: "50px" }}
        />
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">
            {calculateDaysLeft(data.end_date)}{" "}
            {calculateDaysLeft(data.end_date) === 1
              ? "Dia Restante"
              : "Dias Restantes"}
          </span>
          <span className="text-green-500 font-semibold">
            {data.current_value || "--"} - Arrecadado
          </span>
        </div>
      </div>
    </div>
  );
};

export default Card;
