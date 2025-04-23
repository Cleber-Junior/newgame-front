import React from "react";

const SaveButton = ({handleSave, style, message}) => {
  return (
    <div className="flex justify-end">
      <button
        onClick={handleSave}
        className={style}
      >
        {message}
      </button>
    </div>
  );
};

export default SaveButton;
