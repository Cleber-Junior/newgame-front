import React from "react";

const Project = ({ projectData, index }) => {
  //Calcula o progresso da campanha
  const progressPercentage = Math.min(
    (parseFloat(projectData.current_value) /
      parseFloat(projectData.meta_value)) *
      100,
    100
  ).toFixed(2);

  //Formatar Data
  const date = new Date(projectData.payment_date);
  const formattedDate = date.toLocaleDateString("pt-BR");

  const renderStatus = (status) => {
    console.log(status);
    if (status === 0) {
      return (
        <p className="text-white bg-red-600 text-center rounded-md">Recusado</p>
      );
    }

    if (status === 1) {
      return (
        <p className="text-white bg-green-600 text-center rounded-md">
          Aprovado
        </p>
      );
    }

    if (status === 2) {
      return (
        <p className="text-white bg-yellow-600 text-center rounded-md">
          Aguardando confirmação
        </p>
      );
    }
  };

  return (
    <tbody key={index}>
      <tr className="bg-gray-100 border-b border-gray-400">
        <th
          scope="row"
          className="px-6 py-4 font-medium text-black"
        >
          {projectData.project_name}
        </th>
        <td className="px-6 py-4 font-medium text-green-600 text-center align-middle">
          {progressPercentage}%
        </td>
        <td className="px-6 py-4 font-medium text-black">
          R$ {projectData.current_value}
        </td>
        <td className="px-6 py-4 font-medium text-black">{formattedDate}</td>
        <td className="px-6 py-4 font-medium text-black">
          R$ {projectData.value}
        </td>
        <td className="px-6 py-4 font-medium">
          {renderStatus(projectData.status)}
        </td>
      </tr>
    </tbody>
  );
};

export default Project;
