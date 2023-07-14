import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { AiTwotoneEdit } from "react-icons/ai";
import { UserContext } from "../../context/UserContext";
import { getQuestion, editQuestion, deleteQuestion } from "../../api/questions";
import { deleteAnswer } from "../../api/answers";
import Question from "../../components/Question/Question";
import { formatDate } from "../../utils/formater";
import Button from "../../components/Button/Button";
import Answer from "../../components/Answer/Answer";
import Loader from "../../components/Loader/Loader";
import "./QuestionWithAnswers.scss";
import Textarea from "../../components/Textarea/Textarea";

const QuestionWithAnswers = () => {
  const { user, isLoggedIn } = useContext(UserContext);
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [question, setQuestion] = useState(null);
  const [editedQuestionBody, setEditedQuestionBody] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [dislikeCount, setDislikeCount] = useState(0);
  const [activeBtn, setActiveBtn] = useState("none");
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoading(true);
    getQuestion(id)
      .then((response) => {
        setQuestion(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  console.log(question);

  /* DELETE QUESTION*/
  const handleDeleteQuestion = (id) => {
    deleteQuestion(id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    navigate("/");
  };

  const handleEditQuestion = () => {
    setEditedQuestionBody(question.questionBody);
    setIsEditing(true);
  };

  console.log(editedQuestionBody);

  const handleSubmitEditForm = (e) => {
    e.preventDefault(e);

    const editedQuestion = {
      editedQuestionBody,
    };

    editQuestion(id, editedQuestion)
      .then((response) => {
        console.log(response);
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
  };

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
    setActiveBtn("like");
  };

  const handleDislikeClick = () => {
    setDislikeCount(dislikeCount + 1);
    setActiveBtn("dislike");
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="question-page">
      {isEditing && (
        <form className="edit-question" onSubmit={handleSubmitEditForm}>
          <Textarea
            cols={50}
            rows={3}
            type="text"
            value={editedQuestionBody}
            onChange={(e) => setEditedQuestionBody(e.target.value)}
          />

          <div className="edit-btns">
            <Button type="submit">Submit</Button>
            <Button
              className="btn-cancel"
              type="button"
              onClick={() => setIsEditing(false)}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}

      <div className="get-q">
        {question && (
          <>
            <div className="question-container">
              <Question
                question={question.questionBody}
                createdAt={formatDate(question.createdAt)}
                updated={
                  question.updatedAt !== null
                    ? `(updated at: ${formatDate(question.updatedAt)})`
                    : ""
                }
                answersCount={question.answers.length}
              >
                <div className="btns-box">
                  {isLoggedIn && (
                    <>
                      <Button className="btn-edit" onClick={handleEditQuestion}>
                        <AiTwotoneEdit />
                      </Button>
                      <Button
                        className="btn-delete"
                        onClick={() => handleDeleteQuestion(question._id)}
                      >
                        <HiOutlineTrash className="btn-icon" />
                      </Button>
                    </>
                  )}
                </div>
              </Question>
            </div>

            {question.answers.length > 0 && (
              <div className="answers-container">
                <h3>all answers:</h3>
                {question.answers.map((a) => (
                  <Answer
                    key={a._id}
                    answerBody={a.answerBody}
                    createdAt={formatDate(a.createdAt)}
                    updatedAt={
                      a.updatedAt !== null
                        ? `(updated at: ${formatDate(a.updatedAt)})`
                        : ""
                    }
                    likeCount={a.like}
                    dislikeCount={a.dislike}
                  />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default QuestionWithAnswers;
