import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { IoMdMail } from "react-icons/io";
import { FaUnlock } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Icon from "../../components/Icon/Icon";
import Image from "../../assets/login.jpg";
import "./Login.scss";

const Login = () => {
  const { handleLogin } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const submitFormHandler = (e) => {
    e.preventDefault();
    const user = { email, password };
    handleLogin(user, setError);
  };

  return (
    <div className="login-page">
      <Card className="form-card">
        <div className="login-header">
          <Heading className="form-heading">Login</Heading>
          <img src={Image} alt="login" />
        </div>
        <p className="login-error">{error ? `${error}` : ""}</p>
        <form onSubmit={submitFormHandler}>
          <div className="input-group">
            <label className="label">Email ID:</label>
            <div className="input-box">
              <Icon>
                <IoMdMail className="icon" />
              </Icon>
              <input
                type="email"
                name="email"
                placeholder="Email ID *"
                required
                className="form-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>
          <div className="input-group">
            <label className="label">Password:</label>
            <div className="input-box">
              <Icon>
                <FaUnlock className="icon" />
              </Icon>
              <input
                type="password"
                placeholder="Password *"
                required
                className="form-input"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
          <Button type="submit" className="form-btn">
            submit
          </Button>
        </form>
        <div className="form-text">
          <p>Don't have an account?</p>
          <span>
            <Link to="/register">Signup</Link>
          </span>
        </div>
        <div className="form-text">
          <p>Back to:</p>
          <span>
            <Link to="/">Main Page</Link>
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Login;
