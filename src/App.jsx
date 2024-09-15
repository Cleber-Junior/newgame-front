import React from "react";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./Screens/Home";
import Login from "./Screens/Login/Login";
import Register from "./Screens/Register/Register";
import CreateProject from "./Screens/Project/createProject";
import EditProject from "./Screens/Project/editProject";
import { TokenStorage } from "./assets/Context/TokenContext";
import Header from "./components/Header";
import Background from "./components/Background";
import "./assets/fonts.css";
import ProtectRoute from "./assets/Context/protectRoute";
import { UserStorage } from "./assets/Context/UserContext";

const App = () => {
  return (
    <TokenStorage>
      <UserStorage>
        <BrowserRouter>
          <Background>
            <Header />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="login" element={<Login />} />
              <Route path="register" element={<Register />} />
              <Route
                path="project/*"
                element={
                  <ProtectRoute>
                    <Routes>
                      <Route path="create" element={<CreateProject />} />
                      <Route path=":id" element={<EditProject />} />
                    </Routes>
                  </ProtectRoute>
                }
              />
            </Routes>
          </Background>
        </BrowserRouter>
      </UserStorage>
    </TokenStorage>
  );
};

export default App;
