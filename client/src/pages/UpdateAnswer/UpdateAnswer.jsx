import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { updateAnswer, getAnswer } from "../../api/answers";
import Topbar from "../../components/Topbar/Topbar";
import Textarea from "../../components/Textarea/Textarea";
import Loader from "../../components/Loader/Loader";
import "./UpdateAnswer.scss";
import { formatDate } from "../../utils/formater";
import Button from "../../components/Button/Button";

const UpdateAnswer = () => {
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [answer, setAnswewr] = useState(null);
  const [updatedAnswerBody, setUpdatedAnswerBody] = useState(
    answer?.answerBodyBody
  );
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    getAnswer(id)
      .then((response) => {
        setAnswewr(response);
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);
  console.log(answer);

  const handleEditAnswer = () => {
    setUpdatedAnswerBody(answer.answerBody);
    setIsEditing(true);
  };

  const handleSubmitEditForm = (e) => {
    e.preventDefault();
    const updatedAnswer = {
      answerBody: updatedAnswerBody,
      like: answer.like,
      dislike: answer.dislike,
    };

    updateAnswer(id, updatedAnswer)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
    window.location.reload();
  };

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <Topbar />
      <div className="answer-page">
        {isEditing && (
          <form className="edit-question" onSubmit={handleSubmitEditForm}>
            <Textarea
              cols={50}
              rows={3}
              type="text"
              value={updatedAnswerBody}
              onChange={(e) => {
                setUpdatedAnswerBody(e.target.value);
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

        {answer && (
          <div className="answer-container">
            <h3 className="answer-text">{answer.answerBody}</h3>
            <p className="creating-date">{`(created at: ${formatDate(
              answer.createdAt
            )}`}</p>
            <p className="updating">
              {answer.updatedAt !== null
                ? `(updated at: ${formatDate(answer.updatedAt)})`
                : ""}
            </p>

            {!isEditing && (
              <Button onClick={handleEditAnswer}>edit answer</Button>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default UpdateAnswer;
