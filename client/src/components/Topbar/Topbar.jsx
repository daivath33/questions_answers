import { Link } from "react-router-dom";
import Button from "../Button/Button";
import Logo from "./../../assets/logo1.jpg";
import User from "./../../assets/signup4.jpg";
import "./Topbar.scss";

const Topbar = () => {
  return (
    <div className="navigation">
      <div className="logo">
        <img src={Logo} />
      </div>
      <nav className="navigation-list">
        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/register" className="link">
          Signup
          {/* <img src={User} /> */}
        </Link>
        <Button>Logout</Button>
      </nav>
    </div>
  );
};

export default Topbar;
