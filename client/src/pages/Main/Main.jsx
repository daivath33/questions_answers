import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Question from "../../components/Question/Question";
import Answer from "../../components/Answer/Answer";
import Like from "../../components/Like/Like";
import Input from "../../components/Input/Input";
import { formatDate } from "./../../utils/formater";
import Avatar1 from "../../assets/u1.jpg";
import "./Main.scss";

const Main = () => {
  const { id } = useParams();
  console.log(id);
  const [question, setQuestion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [answers, setAnswers] = useState([]);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState("none");

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
    setActiveBtn("like");
  };

  const handleDislikeClick = () => {
    setDislikeCount(dislikeCount + 1);
    setActiveBtn("dislike");
  };
  return (
    <div className="main-page">
      <div className="users-box">
        <div className="user-info">
          <h3>adele</h3>
          <div className="avatar-img">
            <img src={Avatar1} />
          </div>
        </div>
      </div>
      <div className="questions-box">
        <Question question="Ar siandien lijo"></Question>
        <Answer answerBody="Taip ryte lijo...">
          <Like
            onClickLike={handleLikeClick}
            onClickDislike={handleDislikeClick}
            activeBtn={activeBtn}
            likeCount={likeCount}
            dislikeCount={dislikeCount}
          />
        </Answer>
      </div>
    </div>
  );
};

export default Main;
