import { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { HiOutlineTrash } from "react-icons/hi";
import { IoMdAddCircle } from "react-icons/io";
import { AiTwotoneEdit } from "react-icons/ai";
import { UserContext } from "../../context/UserContext";
import {
  getQuestion,
  updateQuestion,
  deleteQuestion,
} from "../../api/questions";
import { postAnswer, deleteAnswer } from "../../api/answers";
import { formatDate } from "../../utils/formater";
import Question from "../../components/Question/Question";
import Topbar from "../../components/Topbar/Topbar";
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
  const [showAddAnswerForm, setShowAddAnswerForm] = useState(false);
  const [showAddAnswerButton, setShowAddAnswerButton] = useState(true);
  const [updatedQuestionBody, setUpdatedQuestionBody] = useState(
    question?.questionBody
  );
  const [isEditing, setIsEditing] = useState(false);
  const [answerBody, setAnswerBody] = useState("");
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
    setUpdatedQuestionBody(question.questionBody);
    setIsEditing(true);
  };

  /*UPDATE QUESTION*/
  const handleSubmitEditForm = (e) => {
    e.preventDefault(e);
    const updatedQuestion = { questionBody: updatedQuestionBody };
    updateQuestion(id, updatedQuestion)
      .then((response) => {
        console.log(response);
        setIsEditing(false);
      })
      .catch((err) => console.log(err));
    window.location.reload();
  };

  const handleLikeClick = () => {
    setLikeCount(likeCount + 1);
    setActiveBtn("like");
  };

  const handleDislikeClick = () => {
    setDislikeCount(dislikeCount + 1);
    setActiveBtn("dislike");
  };

  /* CREATE NEW ANSWER*/
  const handleSubmitAddAnswerForm = (e) => {
    e.preventDefault();
    const submittedAnswer = {
      answerBody,
    };
    postAnswer(id, submittedAnswer);
    setShowAddAnswerForm(false);
    setShowAddAnswerButton(true);
    setAnswerBody("");
    window.location.reload();
  };
  /* DELETE ANSWER*/
  const handleDeleteAnswer = (id) => {
    deleteAnswer(id)
      .then((res) => {
        console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
    window.location.reload();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Topbar />
      <div className="question-page">
        {isEditing && (
          <form className="edit-question" onSubmit={handleSubmitEditForm}>
            <Textarea
              cols={50}
              rows={3}
              type="text"
              value={updatedQuestionBody}
              onChange={(e) => {
                setUpdatedQuestionBody(e.target.value);
              }}
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
                        <Button
                          className="btn-edit"
                          onClick={handleEditQuestion}
                        >
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
                {isLoggedIn && showAddAnswerButton && (
                  <Button
                    className="btn-add"
                    onClick={() => {
                      setShowAddAnswerForm(true);
                      setShowAddAnswerButton(false);
                    }}
                  >
                    <div className="btn-title">
                      <span>add new answer</span>
                      <IoMdAddCircle className="btn-icon" />
                    </div>
                  </Button>
                )}
                {isLoggedIn && showAddAnswerForm && (
                  <form onSubmit={handleSubmitAddAnswerForm}>
                    <Textarea
                      value={answerBody}
                      onChange={(e) => setAnswerBody(e.target.value)}
                    />
                    <div className="btns-box">
                      <Button type="submit" className="btn-submit">
                        submit
                      </Button>
                      <Button
                        className="btn-cancel"
                        onClick={() => {
                          setShowAddAnswerForm(false);
                          setShowAddAnswerButton(true);
                        }}
                      >
                        cancel
                      </Button>
                    </div>
                  </form>
                )}
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
                      onClickDelete={() => handleDeleteAnswer(a._id)}
                    />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default QuestionWithAnswers;
