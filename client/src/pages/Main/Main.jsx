import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";
import { IoMdAddCircle } from "react-icons/io";
import { AiFillCaretDown, AiFillCaretUp } from "react-icons/ai";
import Topbar from "../../components/Topbar/Topbar";
import Loader from "../../components/Loader/Loader";
import Textarea from "../../components/Textarea/Textarea";
import Question from "../../components/Question/Question";
import { formatDate } from "./../../utils/formater";
import "./Main.scss";
import Sidebar from "../../components/Sidebar/Sidebar";
import Button from "../../components/Button/Button";
import { getQuestions, createQuestion } from "../../api/questions";

const Main = () => {
  const { isLoggedIn } = useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [questionBody, setQuestionBody] = useState("");
  const [questions, setQuestions] = useState([]);
  const [sort, setSort] = useState("asc");
  const [showAddQuestionForm, setShowAddQuestionForm] = useState(false);
  const [showAddQuestionButton, setShowAddQuestionButton] = useState(true);

  const navigate = useNavigate();

  const getAllQuestions = (sort) => {
    setIsLoading(true);
    getQuestions(sort)
      .then((response) => {
        setQuestions(response);
        console.log(response);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllQuestions(sort);
  }, [sort]);

  const handleViewQuestion = (id) => {
    navigate(`/questions/${id}`);
  };

  /* QUESTIONS */
  /* ADD QUESTION*/
  const handleAddQuestion = (e) => {
    e.preventDefault(e);
    const submittingQuestion = {
      questionBody,
    };
    createQuestion(submittingQuestion);
    setShowAddQuestionForm(false);
    setShowAddQuestionButton(true);
    setQuestionBody("");
    window.location.reload();
  };

  if (isLoading) {
    return <Loader />;
  }

  if (questions.length === 0) {
    return <p>No questions...</p>;
  }

  return (
    <>
      <div className="main">
        <Topbar />
        <div className="main-page">
          <Sidebar />
          <div className="questions-box">
            <div className="sort-questions">
              <p>Sort:</p>
              <div className="sort-questions-btns">
                <AiFillCaretUp onClick={() => setSort("asc")} />
                <AiFillCaretDown onClick={() => setSort("desc")} />
              </div>
            </div>

            {questions.map((q) => (
              <div key={q._id} className="question-box">
                <Question
                  question={q.questionBody}
                  createdAt={formatDate(q.createdAt)}
                  answersCount={q.answerCount}
                  updated={
                    q.updatedAt !== null
                      ? `(updated at: ${formatDate(q.updatedAt)})`
                      : ""
                  }
                >
                  <Button
                    className="btn-q"
                    onClick={() => handleViewQuestion(q._id)}
                  >
                    view question
                  </Button>
                </Question>
              </div>
            ))}
            {isLoggedIn && showAddQuestionForm && (
              <form onSubmit={handleAddQuestion}>
                <Textarea
                  value={questionBody}
                  onChange={(e) => setQuestionBody(e.target.value)}
                />
                <div className="btns-box">
                  <Button type="submit" className="btn-submit">
                    submit
                  </Button>
                  <Button
                    className="btn-cancel"
                    onClick={() => {
                      setShowAddQuestionForm(false);
                      setShowAddQuestionButton(true);
                    }}
                  >
                    cancel
                  </Button>
                </div>
              </form>
            )}
            {isLoggedIn && showAddQuestionButton && (
              <Button
                className="btn-add"
                onClick={() => {
                  setShowAddQuestionForm(true);
                  setShowAddQuestionButton(false);
                }}
              >
                <div className="btn-title">
                  <span>add new question</span>
                  <IoMdAddCircle className="btn-icon" />
                </div>
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Main;
