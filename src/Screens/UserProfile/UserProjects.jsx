import React, { useEffect } from "react";
import { myApi } from "../../api/api";
import { Link } from "react-router-dom";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import EditCard from "../../components/Projects/EditCard";
import Loading from "../../components/Projects/Loading";
import background from "../../assets/img/profile_background.png";
import PlaceholderIcon from "../../assets/img/UserIcon.jpg"


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
  console.log(urlImage);

  return (
    <div>
      <div class="bg-green-700 h-48 relative">
        <div class="absolute inset-0 bg-gradient-to-r from-green-700 to-green-600 opacity-80">
          <img
            src={background}
            alt="Background"
            class="w-full h-full object-cover"
          />
        </div>
        <div class="relative flex justify-center items-center">
          <div class="absolute top-12">
            {user.image === null ? (
              <img
                src={PlaceholderIcon}
                alt="Foto do Usuário"
                class="rounded-full border-4 border-white shadow-lg w-28"
              />
            ) : (
              <img
                src={user.image}
                alt="Foto do Usuário"
                class="rounded-full border-4 border-white shadow-lg"
              />
            )}
          </div>
        </div>
      </div>

      <div class="mt-16 text-center">
        <h1 class="text-2xl font-bold text-gray-800">{user.name}</h1>
      </div>

      <nav class="mt-4 flex justify-center space-x-8 border-b border-gray-300">
        <a
          href="#apoiados"
          class="text-gray-600 hover:text-green-600 px-4 py-2 border-b-4 border-transparent hover:border-green-600"
        >
          Apoiados
        </a>
        <Link
          to={"../projects"}
          class="text-green-600 border-green-600 font-bold px-4 py-2 border-b-4"
        >
          Criados
        </Link>
        <a
          href="#perfil"
          class="text-gray-600 hover:text-green-600 px-4 py-2 border-b-4 border-transparent hover:border-green-600"
        >
          Perfil Público
        </a>
        <Link
          to={"../about"}
          class="text-gray-600 px-4 py-2 border-b-4 hover:border-green-600 border-transparent hover:text-green-600"
        >
          Sobre
        </Link>
      </nav>
      <h1 className="text-2xl mt-4 font-semibold text-center">
        Projetos Criados
      </h1>
      {loading ? (
        <Loading />
      ) : userProjects ? (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
          {userProjects.map((project, index) => (
            <EditCard key={index} data={project} url={urlImage} />
          ))}
        </div>
      ) : (
        <p>Você ainda não possui projetos</p>
      )}
    </div>
  );
};

export default UserProjects;
