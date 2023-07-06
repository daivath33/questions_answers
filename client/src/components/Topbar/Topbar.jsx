import { Link } from "react-router-dom";
import Button from "../Button/Button";
import "./Topbar.scss";

const Topbar = () => {
  return (
    <div className="navigation">
      <div className="logo">LOGO</div>
      <nav className="navigation-list">
        <Link to="/login" className="link">
          Login
        </Link>
        <Link to="/register" className="link">
          Register
        </Link>
        <Button></Button>
      </nav>
    </div>
  );
};

export default Topbar;
