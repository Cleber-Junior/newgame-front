const RewardSelect = ({ reward, selected, onSelect }) => {
  return (
    <div
      className={`border rounded-lg p-4 w-full cursor-pointer transition ${
        selected ? "bg-gray-300 border-green-500 shadow-md" : "bg-gray-100"
      }`}
      onClick={onSelect} // Permite selecionar clicando no componente inteiro
    >
      {/* Título e Descrição */}
      <h3 className="text-lg font-semibold">{reward.name}</h3>
      <p className="text-sm text-gray-700">{reward.description}</p>

      {/* Campo de valor e seleção */}
      <div className="flex items-center justify-between mt-4">
        {selected ? (
          <div className="flex items-center bg-white border border-gray-300 rounded-md px-3 py-1">
            <span className="text-green-600 font-semibold text-lg">R$</span>
            <input
              type="text"
              value={reward.value}
              className="w-20 text-gray-900 text-lg font-semibold outline-none px-2 cursor-default"
              disabled
            />
          </div>
        ) : (
          <span className="text-gray-700">R$ {reward.value} ou mais</span>
        )}

        {/* Checkbox de seleção */}
        <input
          type="radio"
          name="reward"
          checked={selected}
          onChange={onSelect}
          className="w-5 h-5 accent-green-600 cursor-pointer"
          onClick={(e) => e.stopPropagation()} // Impede que o clique duplo no input deselecione
        />
      </div>

      {/* Botão de continuar visível apenas quando selecionado */}
      {selected && (
        <button className="mt-4 w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition">
          Continuar
        </button>
      )}
    </div>
  );
};

export default RewardSelect;
