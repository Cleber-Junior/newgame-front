import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import CreateProject from "./Screens/Project/CreateProject";
import EditProject from "./Screens/Project/editProject";
import { TokenStorage } from "./assets/Context/TokenContext";
import ProtectRoute from "./assets/Context/protectContext";
import { UserStorage } from "./assets/Context/UserContext";
import UserProfile from "./Screens/UserProfile/UserProfile";
import UserProjects from "./Screens/UserProfile/UserProjects";
import Header from "./components/Header";
import { Background } from "./components/Background";
import "./index.css";

const App = () => {
  const location = useLocation();
  const hideHeader =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <TokenStorage>
      <UserStorage>
        {!hideHeader && <Header />}
        <Background>
          <Routes>
            <Route>
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
            </Route>
          </Routes>
        </Background>
        <Routes> 
          <Route path="/" element={<Home />} />
          <Route
            path="project/*"
            element={
              <ProtectRoute>
                <Routes>
                  <Route path="create" element={<CreateProject />} />
                  <Route path="edit" element={<EditProject />} />
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
