import { AiFillLike, AiFillDislike } from "react-icons/ai";
import "./Like.scss";

const Like = ({
  onClickLike,
  onClickDislike,
  activeBtn,
  likeCount,
  dislikeCount,
}) => {
  return (
    <div className="ld-container">
      <div className="ld-group">
        <AiFillLike
          onClick={onClickLike}
          className={`like-icon ${activeBtn === "like" ? "like-active" : ""}`}
        />
        <div className="like-count">{likeCount}</div>
      </div>
      <div className="ld-group">
        <AiFillDislike
          onClick={onClickDislike}
          className={`dislike-icon ${
            activeBtn === "dislike" ? "dislike-active" : ""
          }`}
        />
        <div className="dislike-count">{dislikeCount}</div>
      </div>
    </div>
  );
};

export default Like;
