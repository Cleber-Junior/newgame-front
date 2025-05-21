import React, { useEffect } from "react";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import Loading from "../../components/Common/Loading";
import ProfileNav from "../../components/User/Profile/ProfileNav";
import { getPaymentProjects } from "../../Utils/UtilsUser/UtilsUser";
import Project from "../../components/User/SupportedProjects/Project";

const UserSupported = () => {
  const { token } = React.useContext(TokenContext);
  const { user } = React.useContext(UserContext);
  const [projects, setProjects] = React.useState([]);

  const getSupportedProjects = async () => {
    try {
      const response = await getPaymentProjects(token, user.id);
      setProjects(response.supported);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getSupportedProjects();
  }, []);

  console.log(projects);

  if (!token || !projects) {
    return (
      <div className="flex items-center justify-center min-h-full">
        <Loading />
      </div>
    );
  }

  return (
    <ProfileNav>
      <h1 className="text-2xl mt-4 font-semibold text-center">
        Projetos Apoiados
      </h1>
      {!projects ? (
        <p className="text-center mt-5">Você ainda não apoiou nenhum projeto</p>
      ) : (
        <div className="flex justify-center mt-4 mb-6">
          <div className="w-full max-w-6xl">
            <table className="w-full text-sm text-center text-gray-500 dark:text-gray-400 mt-4">
              <thead className="text-xs text-white uppercase bg-green-600 ">
                <tr>
                  <th className=" py-3">Projeto</th>
                  <th scope="col" className=" py-3 text-center">
                    Andamento do Projeto
                  </th>
                  <th scope="col" className=" py-3">
                    Valor atual do Projeto
                  </th>
                  <th scope="col" className=" py-3">
                    Data do Pagamento
                  </th>
                  <th scope="col" className=" py-3">
                    Valor
                  </th>
                  <th scope="col" className=" py-3">
                    Status Pagamento
                  </th>
                </tr>
              </thead>
              {projects.map((project, index) => (
                <Project projectData={project} index={index} />
              ))}
            </table>
          </div>
        </div>
      )}
    </ProfileNav>
  );
};

export default UserSupported;
