import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context/UserContext";
import Button from "../Button/Button";
import Logo from "./../../assets/logo1.jpg";
import "./Topbar.scss";

const Topbar = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const { handleLogout } = useContext(UserContext);

  return (
    <div className="navigation">
      <div className="logo">
        <img src={Logo} alt="logo" />
      </div>

      <nav className="navigation-list">
        {isLoggedIn && <h3>hello, {user.firstName}!</h3>}
        <Link to="/">All Questions</Link>
        {isLoggedIn && (
          <>
            <Button onClick={handleLogout}>Logout</Button>
          </>
        )}

        {!isLoggedIn && (
          <>
            <Link to="/login" className="link">
              Login
            </Link>
            <Link to="/register" className="link">
              Signup
            </Link>
          </>
        )}
      </nav>
    </div>
  );
};

export default Topbar;
