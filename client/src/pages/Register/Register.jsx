import { Link } from "react-router-dom";
import { IoMdMail } from "react-icons/io";
import { FaUser, FaLock } from "react-icons/fa";
import Heading from "../../components/Heading/Heading";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import Card from "../../components/Card/Card";
import Icon from "../../components/Icon/Icon";
import Avatar1 from "../../assets/u1.jpg";
import Avatar2 from "../../assets/u9.jpg";
import Avatar3 from "../../assets/u3.jpg";
import Avatar4 from "../../assets/u7.jpg";
import Avatar5 from "../../assets/u6.jpg";
import "./Register.scss";

const Register = () => {
  return (
    <div className="cards-wrapper">
      <Card className="form-card">
        <Heading className="form-heading">Create Account</Heading>
        <div className="input-group">
          <label className="label">First Name:</label>
          <div className="input-box">
            <Icon>
              <FaUser className="icon" />
            </Icon>
            <Input
              type="text"
              placeholder="First Name *"
              required
              className="form-input"
            />
          </div>
        </div>
        <div className="input-group">
          <label className="label">Last Name:</label>
          <div className="input-box">
            <Icon>
              <FaUser className="icon" />
            </Icon>
            <Input
              type="text"
              placeholder="Last Name *"
              required
              className="form-input"
            />
          </div>
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
              <FaLock className="icon" />
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
        <p className="form-text">
          Already have an account?{" "}
          <span>
            <Link to="/login">Login</Link>
          </span>
        </p>
      </Card>
      <Card className="avatars-card">
        <div className="avatars-box">
          <p>Choose your avatar</p>
          <div className="avatar-img">
            <img src={Avatar1} />
            <Input type="radio" name="avatar" value="a1" required />
          </div>
          <div className="avatar-img">
            <img src={Avatar2} />
            <Input type="radio" name="avatar" value="a2" required />
          </div>
          <div className="avatar-img">
            <img src={Avatar3} />
            <Input type="radio" name="avatar" value="a3" required />
          </div>
          <div className="avatar-img">
            <img src={Avatar4} />
            <Input type="radio" name="avatar" value="a4" required />
          </div>
          <div className="avatar-img">
            <img src={Avatar5} />
            <Input type="radio" name="avatar" value="a5" required />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Register;
