import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../../context/UserContext";
import { IoMdMail } from "react-icons/io";
import { FaUser, FaLock } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Icon from "../../components/Icon/Icon";

import "./Register.scss";
import AvatarsBox from "./AvatarsBox";

const Register = () => {
  const { handleRegister } = useContext(UserContext);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const submitFormHandler = (e) => {
    e.preventDefault();
    const user = { firstName, lastName, email, password };
    handleRegister(user);
  };

  return (
    <div className="register-page">
      <div className="cards-wrapper">
        <Card className="form-card">
          <Heading className="form-heading">Create Account</Heading>
          <form onSubmit={submitFormHandler}>
            <div className="input-group">
              <label className="label">First Name:</label>
              <div className="input-box">
                <Icon>
                  <FaUser className="icon" />
                </Icon>
                <input
                  type="text"
                  placeholder="First Name *"
                  required
                  className="form-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label className="label">Last Name:</label>
              <div className="input-box">
                <Icon>
                  <FaUser className="icon" />
                </Icon>
                <input
                  type="text"
                  placeholder="Last Name *"
                  required
                  className="form-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </div>
            <div className="input-group">
              <label className="label">Email ID:</label>
              <div className="input-box">
                <Icon>
                  <IoMdMail className="icon" />
                </Icon>
                <input
                  type="email"
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
                  <FaLock className="icon" />
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
            <Button className="form-btn">submit</Button>
          </form>
          <div className="form-text">
            <p>Already have an account?</p>
            <span>
              <Link to="/login">Login</Link>
            </span>
          </div>
          <div className="form-text">
            <p>Back to:</p>
            <span>
              <Link to="/">Main Page</Link>
            </span>
          </div>
        </Card>
        <AvatarsBox />
      </div>
    </div>
  );
};

export default Register;
