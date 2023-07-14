import { useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../context/UserContext";
import { HiOutlineTrash } from "react-icons/hi";
import { AiTwotoneEdit } from "react-icons/ai";
import Button from "../Button/Button";
import "./Question.scss";
import { generatePath } from "react-router-dom";

const Question = ({ question, createdAt, updated, answersCount, children }) => {
  const { user, isLoggedIn } = useContext(UserContext);

  return (
    <div className="question-card">
      <div>
        <div className="question">
          <p className="question-text">{question}</p>
          <div className="creating-date">{`(created at: ${createdAt})`}</div>
          <div className="updating">{updated}</div>
          <div className="answers-count">
            {answersCount !== 0
              ? `answers count: ${answersCount}`
              : "no answers"}
          </div>
        </div>
        <div className="btns-box">
          {/* {isLoggedIn && (
            <>
              <Button className="btn-edit" onClick={onClickEdit}>
                <AiTwotoneEdit className="btn-icon" />
              </Button>
              <Button className="btn-delete" onClick={onClickDelete}>
                <HiOutlineTrash className="btn-icon" />
              </Button>
            </>
          )} */}
        </div>
      </div>

      {children}
    </div>
  );
};

export default Question;
