import React, { useEffect, useState } from "react";
import { UserContext } from "../../assets/Context/UserContext";
import { TokenContext } from "../../assets/Context/TokenContext";
import { Link } from "react-router-dom";

const HeaderUser = ({ dataUser }) => {
  const { saveUser } = React.useContext(UserContext);
  const { saveToken } = React.useContext(TokenContext);
  const selectRef = React.useRef();
  const [open, setOpen] = useState(false);

  const user = dataUser;
  console.log("user", user);

  const handleClickModal = () => {
    setOpen(!open);
  };

  const handleClickOutside = (event) => {
    if (selectRef.current && !selectRef.current.contains(event.target)) {
      setOpen(false);
    }
  };

  function handleLogout() {
    localStorage.clear();
    saveUser(null);
    saveToken(null);
  }

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div onClick={handleClickModal} className="relative">
      <div className="flex items-center space-x-3 cursor-pointer">
        <div className="font-semibold text-white uppercase letter">
          {user.name}
        </div>
        <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-900">
          <img
            src="https://media.istockphoto.com/id/1154370446/pt/foto/funny-raccoon-in-green-sunglasses-showing-a-rock-gesture-isolated-on-white-background.jpg?s=2048x2048&w=is&k=20&c=Ho4ooTrqOEC9AiCp9qmHU4fjqpaxt_AI8gv19foXDr8="
            alt="User Avatar"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {open && (
        <div
          ref={selectRef}
          className="absolute right-0 mt-2 w-60 px-5 py-3 bg-white text-black rounded-lg shadow border border-transparent"
        >
          <ul className="space-y-3">
            <Link to={"./user/profile"}>
              <li className="font-medium">
                <a
                  href="#"
                  className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-green-500"
                >
                  Perfil
                </a>
              </li>
            </Link>
            <Link to={"./user/projects"}>
              <li className="font-medium">
                <a
                  href="#"
                  className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-green-500"
                >
                  Meus Projetos
                </a>
              </li>
            </Link>

            <hr className="border-gray-700" />
            <li
              className="font-medium cursor-pointer"
              onClick={() => handleLogout}
            >
              <a
                onClick={handleLogout}
                className="flex items-center transition-colors duration-200 border-r-4 border-transparent hover:border-red-600"
              >
                <div className="mr-3 text-red-600">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7"
                    ></path>
                  </svg>
                </div>
                Logout
              </a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default HeaderUser;
