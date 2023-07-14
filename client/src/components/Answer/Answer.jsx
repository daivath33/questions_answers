import { useContext } from "react";
import PropTypes from "prop-types";
import { UserContext } from "../../context/UserContext";
import { HiOutlineTrash } from "react-icons/hi";
import { AiTwotoneEdit } from "react-icons/ai";
import Button from "../Button/Button";
import Like from "../Like/Like";
import "./Answer.scss";

const Answer = ({
  answerBody,
  createdAt,
  updatedAt,
  onClickDelete,
  onClickEdit,
  onClickLike,
  onClickDislike,
  likeCount,
  dislikeCount,
  activeBtn,
}) => {
  const { isLoggedIn } = useContext(UserContext);

  return (
    <div className="answer">
      <p className="answer-text">{answerBody}</p>
      <div className="answer-data-box">
        <div className="creating-date">{`(created at: ${createdAt})`}</div>
        <div className="updating">{updatedAt}</div>
      </div>
      <div className="answer-actions">
        {isLoggedIn && (
          <>
            <div className="btns-box">
              <Button className="btn-edit" onClick={onClickEdit}>
                <AiTwotoneEdit className="btn-icon" />
              </Button>
              <Button className="btn-delete" onClick={onClickDelete}>
                <HiOutlineTrash className="btn-icon" />
              </Button>
            </div>
            <Like
              onClickLike={onClickLike}
              onClickDislike={onClickDislike}
              activeBtn={activeBtn}
              likeCount={likeCount}
              dislikeCount={dislikeCount}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Answer;
