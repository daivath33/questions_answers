import axios from "axios";

export const getAnswers = async (id) => {
  const response = await axios.get(
    `http://localhost:5000/questions/${id}/answers`
  );
  return response.data;
};

export const postAnswer = async (id, answer) => {
  const response = await axios.post(
    `http://localhost:5000/questions/${id}/answers`,
    answer
  );
  return response.data;
};

export const updateAnswer = async (id, answer) => {
  const response = await axios.patch(
    `http://localhost:5000/answers/${id}`,
    answer
  );
  return response.data;
};

export const deleteAnswer = async (id) => {
  await axios.delete(`http://localhost:5000/answers/${id}`);
  return "Successfully deleted...";
};

export const getAnswer = async (id) => {
  const response = await axios.get(`http://localhost:5000/answers/${id}`);
  return response.data;
};
