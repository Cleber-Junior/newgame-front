import React from "react";
import { Link } from "react-router-dom";

const Card = ({ data }) => {
  return (
    <div>
      <div key={data.id} className="bg-sky-700 w-20">
        <h2>{data.name}</h2>
        <p>{data.description}</p>
        <Link to={"../../project/edit"} state={{ projectId: data.id }}>
          <button className="bg-red-700 ">Editar Projeto</button>
        </Link>
      </div> 
    </div>
  );
};

export default Card;
