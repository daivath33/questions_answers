import { Routes as RoutesWrapper, Route } from "react-router-dom";
import Main from "../pages/Main/Main";
import Login from "../pages/Login/Login";
import Register from "../pages/Register/Register";
import Topbar from "../components/Topbar/Topbar";
import MainLayout from "../layouts/MainLayout";
import Heading from "../components/Heading/Heading";
const Routes = () => {
  return (
    <MainLayout>
      <Topbar />
      <RoutesWrapper>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </RoutesWrapper>
    </MainLayout>
  );
};

export default Routes;
