import React from "react";

const SaveButton = ({handleSave}) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={handleSave}
        className="px-6 py-2 text-white bg-green-500 rounded-md hover:bg-green-600"
      >
        Salvar
      </button>
    </div>
  );
};

export default SaveButton;
