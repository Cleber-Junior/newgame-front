import React, { useEffect } from "react";
import { myApi } from "../../api/api";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import EditCard from "../../components/Projects/EditCard";
import Loading from "../../components/Projects/Loading";

const UserProjects = () => {
  const { user } = React.useContext(UserContext);
  const { token } = React.useContext(TokenContext);
  const [loading, setLoading] = React.useState(true);
  const [urlImage, setUrlImage] = React.useState("");
  const [userProjects, setUserProjects] = React.useState([]);

  const fetchProjectsUser = async () => {
    const response = await myApi.get(`user/projects/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      setLoading(false);
      setUserProjects(response.data.projects);
      setUrlImage(response.data.url);
      console.log(response);
    }
  };

  useEffect(() => {
    fetchProjectsUser();
  }, []);

  console.log(userProjects);
  
  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <h1 className="text-2xl mt-4 font-semibold text-center">Projetos Criados</h1>
      {userProjects ? (
        userProjects.map((project, index) => (
          <EditCard key={index} data={project} url={urlImage} />
        ))
      ) : (
        <p>Você ainda não possui projetos</p>
      )}
    </div>
  );
};

export default UserProjects;
