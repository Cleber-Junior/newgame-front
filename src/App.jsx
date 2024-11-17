import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import CreateProject from "./Screens/Project/createProject";
import EditNameProject from "./Screens/Project/EditionProject/editNameProject";
import { TokenStorage } from "./assets/Context/TokenContext";
import ProtectRoute from "./assets/Context/protectContext";
import { UserStorage } from "./assets/Context/UserContext";
import UserProfile from "./Screens/UserProfile/UserProfile";
import UserProjects from "./Screens/UserProfile/UserProjects";
import Header from "./components/Header";
// import { Background } from "./components/Background";
import MenuProjects from "./components/Projects/MenuProjects";
import "./index.css";
import EditFinanceProject from "./Screens/Project/EditionProject/EditFinanceProject";
import EditDescProject from "./Screens/Project/EditionProject/EditDescProject";
import EditVisualProject from "./Screens/Project/EditionProject/editVisualProject";
import { FetchProvider } from "./assets/Context/FetchContext";

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
        <FetchProvider>
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
        </FetchProvider>
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
