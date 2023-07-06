import Like from "./../../components/Like/Like";
import "./Answer.scss";

const Answer = ({ answerBody, children }) => {
  return (
    <div className="answer">
      <p>{answerBody}</p>
      {children}
    </div>
  );
};

export default Answer;
