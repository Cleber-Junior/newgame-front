import React from "react";

const Card = ({ data }) => {
  return (
    <div>
      <div key={data.id}>
        <h2>{data.name}</h2>
        <p>{data.description}</p>
      </div>
    </div>
  );
};

export default Card;
