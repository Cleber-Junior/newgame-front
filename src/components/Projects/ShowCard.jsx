import React from "react";

const Card = ({ data }) => {
  console.log(data);

  const calculateDaysLeft = (endDate) => {
    const today = new Date(); // Data atual
    const targetDate = new Date(endDate); // Data final
    const diffInTime = targetDate - today; // Diferença em milissegundos
    return Math.max(0, Math.ceil(diffInTime / (1000 * 60 * 60 * 24))); // Converte para dias, evita valores negativos
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col justify-between h-64 m-14">
      {/* Área da Imagem */}
      {data.image ? (
        <img
          src={data.image}
          alt={data.name}
          className="w-full h-40 object-cover"
        />
      ) : (
        <div className="w-full h-40 flex items-center justify-center bg-gray-200 text-gray-500 text-center">
          Nenhuma imagem selecionada
        </div>
      )}

      {/* Área do Conteúdo */}
      <div className="p-4">
        <h2 className="text-base font-bold text-gray-800 mb-2">{data.name}</h2>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {data.description}
        </p>
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
