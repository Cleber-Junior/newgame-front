import React from "react";
import { Link } from "react-router-dom";
import Placeholder from "../../assets/img/placeholder.svg";
import {ProjectContext} from "../../assets/Context/ProjectContext";

const Card = ({ data, url }) => {
  console.log(data);

  const { saveProject } = React.useContext(ProjectContext);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-evenly w-full max-w-xs m-14">
      <div>
        {url ? (
          <img
            src={url}
            alt={data.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        ) : (
          <img
            src={Placeholder}
            alt={data.name}
            className="w-full h-48 object-cover rounded-md mb-4"
          />
        )}

        <h2 className="text-lg font-semibold text-gray-800">{data.name}</h2>
        <p className="text-sm text-gray-600 mb-4">{data.description}</p>
        {data.status !== 1 ? (
          <Link
            to="../../project/edit/name"
            className="mt-auto"
            onClick={() => {
              saveProject(data);
            }}
          >
            <button className="w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
              Editar Projeto
            </button>
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Card;
