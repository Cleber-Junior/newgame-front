import React from "react";

const GenericField = ({ type, name, value, onChange, style, placeholder }) => {
  return (
    <>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={style}
        placeholder={placeholder}
      />
    </>
  );
};

export default GenericField;
