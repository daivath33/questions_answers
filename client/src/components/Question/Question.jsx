import { HiOutlineTrash } from "react-icons/hi";
import { AiTwotoneEdit } from "react-icons/ai";
import Button from "../Button/Button";
import "./Question.scss";

const Question = ({
  question,
  createdAt,
  isUpdated,
  onClickDelete,
  onClickEdit,
  onViewAllAnswers,
}) => {
  return (
    <div className="question-card">
      <div className="question">
        <p className="question-text">{question}</p>
        <div className="creating-date">(created at: {createdAt})</div>
        <div className="updating">{isUpdated}</div>
      </div>
      <div className="btns-box" onClick={onViewAllAnswers}>
        <Button className="btn-q">View all answers</Button>
        <Button className="btn-q edit" onClick={onClickEdit}>
          <AiTwotoneEdit className="btn-icon" />
        </Button>
        <Button className="btn-q delete" onClick={onClickDelete}>
          <HiOutlineTrash className="btn-icon" />
        </Button>
      </div>
    </div>
  );
};

export default Question;
