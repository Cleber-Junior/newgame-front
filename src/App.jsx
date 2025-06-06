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
import ShowProject from "./Screens/Project/ShowProjects/ShowProject";
import ProtectRoute from "./assets/Context/protectContext";
import UserAbout from "./Screens/UserProfile/UserAbout";
import UserProjects from "./Screens/UserProfile/UserProjects";
import UserPublicProfile from "./Screens/UserProfile/UserPublicProfile";
import UserSupported from "./Screens/UserProfile/UserSupported";
import UserDataPrivacy from "./Screens/UserProfile/UserDataPrivacy";
import Header from "./components/Common/Header";
import MenuProjects from "./components/Projects/MenuProjects";
import EditFinanceProject from "./Screens/Project/EditionProject/EditFinanceProject";
import EditDescProject from "./Screens/Project/EditionProject/EditDescProject";
import EditVisualProject from "./Screens/Project/EditionProject/editVisualProject";
import EditRewardProject from "./Screens/Project/EditionProject/EditRewardProject";
import SelectReward from "./Screens/Project/ShowProjects/SelectReward";
import ReviewData from "./Screens/Payment/ReviewData";
import { ToastContainer } from "react-toastify";

const ProjectEditLayout = ({ project, children }) => (
  <div className="flex">
    <MenuProjects project={project} />
    <div className="flex-1">{children}</div>
  </div>
);

const App = () => {
  const [search, setSearch] = React.useState({});
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";
  return (
    <TokenStorage>
      <ToastContainer autoClose={1000} />
      <UserStorage>
        <ProjectStorage>
          {!hideHeader && <Header handleSearch={setSearch} />}
          <Routes>
            <Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>

          <Routes>
            <Route path="/" element={<Home search={search} />} />
            <Route
              path="project/*"
              element={
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
                  <Route path=":id" element={<ShowProject />} />{" "}
                  <Route path="rewards/:id" element={<SelectReward />} />
                </Routes>
              }
            />
            <Route
              path="user/*"
              element={
                <ProtectRoute>
                  <Routes>
                    <Route path="about" element={<UserAbout />} />
                    <Route path="projects" element={<UserProjects />} />
                    <Route path="public" element={<UserPublicProfile />} />
                    <Route path="supported" element={<UserSupported />} />
                    <Route path="privacy" element={<UserDataPrivacy />} />
                  </Routes>
                </ProtectRoute>
              }
            />
            <Route path="payment" element={<ReviewData />} />
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
