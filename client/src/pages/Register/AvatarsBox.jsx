import Card from "../../components/Card/Card";
import Input from "../../components/Input/Input";
import { avatarsArray } from "../../data/data";
import "./Register.scss";

const AvatarsBox = () => {
  return (
    <Card className="avatars-card">
      <div className="avatars-box">
        <p>Choose your avatar</p>
        {avatarsArray.map((a) => (
          <div className="avatar-img">
            <img src={a.src} />
            <Input type="radio" name={a.name} value={a.value} required />
          </div>
        ))}
      </div>
    </Card>
  );
};

export default AvatarsBox;
