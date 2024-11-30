import React from "react";
import "./index.css";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { TokenStorage } from "./assets/Context/TokenContext";
import { UserStorage } from "./assets/Context/UserContext";
import { ProjectStorage } from "./assets/Context/ProjectContext";
import Home from "./Screens/Home";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import CreateProject from "./Screens/Project/createProject";
import EditNameProject from "./Screens/Project/EditionProject/editNameProject";
import ProtectRoute from "./assets/Context/protectContext";
import UserProfile from "./Screens/UserProfile/UserProfile";
import UserProjects from "./Screens/UserProfile/UserProjects";
import Header from "./components/Header";
import MenuProjects from "./components/Projects/MenuProjects";
import EditFinanceProject from "./Screens/Project/EditionProject/EditFinanceProject";
import EditDescProject from "./Screens/Project/EditionProject/EditDescProject";
import EditVisualProject from "./Screens/Project/EditionProject/editVisualProject";
import EditRewardProject from "./Screens/Project/EditionProject/EditRewardProject";

const ProjectEditLayout = ({ project, children }) => (
  <div className="flex">
    <MenuProjects project={project} />
    <div className="flex-1">{children}</div>
  </div>
);

const App = () => {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <TokenStorage>
      <UserStorage>
        <ProjectStorage>
          {!hideHeader && <Header />}
          <Routes>
            <Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="project/*"
              element={
                <ProtectRoute>
                  <Routes>
                    <Route path="create" element={<CreateProject />} />
                    <Route
                      path="edit/*"
                      element={
                        <ProjectEditLayout project={location.state?.project}>
                          <Routes>
                            <Route path="name" element={<EditNameProject />} />
                            <Route
                              path="finance"
                              element={<EditFinanceProject />}
                            />
                            <Route
                              path="description"
                              element={<EditDescProject />}
                            />
                            <Route
                              path="apperance"
                              element={<EditVisualProject />}
                            />
                            <Route
                              path="rewards"
                              element={<EditRewardProject />}
                            />
                          </Routes>
                        </ProjectEditLayout>
                      }
                    />
                  </Routes>
                </ProtectRoute>
              }
            />
            <Route
              path="user/*"
              element={
                <ProtectRoute>
                  <Routes>
                    <Route path="profile" element={<UserProfile />} />
                    <Route path="projects" element={<UserProjects />} />
                  </Routes>
                </ProtectRoute>
              }
            />
          </Routes>
        </ProjectStorage>
      </UserStorage>
    </TokenStorage>
  );
};

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
