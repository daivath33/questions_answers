import { Link } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { FaUnlock } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Icon from "../../components/Icon/Icon";
import Image from "../../assets/login.jpg";
import "./Login.scss";

const Login = () => {
  return (
    <Card className="form-card">
      <div className="login-header">
        <Heading className="form-heading">Login</Heading>
        <img src={Image} />
      </div>
      <div className="input-group">
        <label className="label">Email ID:</label>
        <div className="input-box">
          <Icon>
            <IoMdMail className="icon" />
          </Icon>
          <Input
            type="email"
            placeholder="Email ID *"
            required
            className="form-input"
          />
        </div>
      </div>
      <div className="input-group">
        <label className="label">Password:</label>
        <div className="input-box">
          <Icon>
            <FaUnlock className="icon" />
          </Icon>
          <Input
            type="password"
            placeholder="Password *"
            required
            className="form-input"
          />
        </div>
      </div>
      <Button className="form-btn">submit</Button>
      <div className="form-text">
        <p>Don't have an account?</p>
        <span>
          <Link to="/register">Signup</Link>
        </span>
      </div>
    </Card>
  );
};

export default Login;
