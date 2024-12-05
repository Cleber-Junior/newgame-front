import React, { useEffect } from "react";
import { myApi } from "../../api/api";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import EditCard from "../../components/Projects/EditCard";
import Placeholder from "../../assets/img/placeholder.svg";
import Loading from "../../components/Projects/Loading";
import ProfileNav from "../../components/Profile/ProfileNav";

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

  console.log(urlImage);

  useEffect(() => {
    fetchProjectsUser();
  }, []);

  return (
    <ProfileNav>
      <h1 className="text-2xl mt-4 font-semibold text-center">
        Projetos Criados
      </h1>
      {loading ? (
        <Loading />
      ) : userProjects ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {userProjects.map((project, index) => {
            const imageUrl = urlImage[index];
            return (
              <EditCard
                key={index}
                data={project}
                url={imageUrl || Placeholder}
              />
            );
          })}
        </div>
      ) : (
        <p>Você ainda não possui projetos</p>
      )}
    </ProfileNav>
  );
};

export default UserProjects;
