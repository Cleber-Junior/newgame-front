import React from "react";
import { Link } from "react-router-dom";
import { ProjectContext } from "../../../assets/Context/ProjectContext";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";

const Card = ({ data, url }) => {
  console.log("URL", url);

  const { saveProject } = React.useContext(ProjectContext);

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col justify-evenly w-full max-w-xs m-14 max-h-[400px] overflow-hidden">
      <div>
        <img
          src={url}
          alt={data.name}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
        <h2 className="text-lg font-semibold text-gray-800">{data.name}</h2>
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
          <>
            {" "}
            <Link to={`../../project/${data.id}`}>
              <button className="w-full mt-8 bg-green-500 text-white py-2 rounded-md hover:bg-green-600 transition duration-200">
                Acessar Projeto
              </button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Card;
