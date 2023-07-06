import { UserContext } from "../context/UserContext";
import { Routes as RoutesWrapper, Route } from "react-router-dom";
import Main from "../pages/Main/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Footer from "../components/Footer/Footer";
import Heading from "../components/Heading/Heading";
import MainLayout from "../layouts/MainLayout";

import { useContext } from "react";
const Routes = () => {
  const { isLoggedIn } = useContext(UserContext);
  return (
    <>
      <MainLayout>
        <Heading>Share and Discover.</Heading>
        <RoutesWrapper>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </RoutesWrapper>
        <Footer />
      </MainLayout>
    </>
  );
};

export default Routes;
