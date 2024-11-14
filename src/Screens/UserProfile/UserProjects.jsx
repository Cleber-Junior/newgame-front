import React, { useEffect } from "react";
import { myApi } from "../../api/api";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import EditCard from "../../components/Projects/EditCard";

const UserProjects = () => {
  const { user } = React.useContext(UserContext);
  const { token } = React.useContext(TokenContext);
  const [userProjects, setUserProjects] = React.useState([]);

  const fetchProjectsUser = async () => {
    const response = await myApi.get(`user/projects/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200) {
      setUserProjects(response.data.projects);
      console.log(response);
    }
  };

  useEffect(() => {
    fetchProjectsUser();
  }, []);

  console.log(userProjects);

  return (
    <div>
      {userProjects ? (
        userProjects.map((project, index) => (
          <EditCard key={index} data={project} />
        ))
      ) : (
        <p>Você ainda não possui projetos</p>
      )}
    </div>
  );
};

export default UserProjects;
