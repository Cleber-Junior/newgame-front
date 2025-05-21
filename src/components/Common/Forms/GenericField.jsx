import React from "react";
import ReactInputMask from "react-input-mask";

const GenericField = ({
  type,
  name,
  value,
  onChange,
  style,
  placeholder,
  mask,
}) => {
  if (mask) {
    return (
      <ReactInputMask mask={mask} value={value} onChange={onChange}>
        {(inputProps) => (
          <input
            {...inputProps}
            type={type}
            name={name}
            className={style}
            placeholder={placeholder}
          />
        )}
      </ReactInputMask>
    );
  }

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
