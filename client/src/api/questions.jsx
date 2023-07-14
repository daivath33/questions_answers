import axios from "axios";

export const getQuestions = async (sort) => {
  const response = await axios.get(
    `http://localhost:5000/questions?sort=${sort}`
  );
  return response.data;
};

export const createQuestion = async (question) => {
  const response = await axios.post(
    "http://localhost:5000/questions",
    question
  );
  return response.data;
};

export const getQuestion = async (id) => {
  const response = await axios.get(`http://localhost:5000/questions/${id}`);
  return response.data;
};

export const editQuestion = async (id, question) => {
  const response = await axios.patch(
    `http://localhost:5000/questions/${id}`,
    question
  );
  return response.data;
};

export const deleteQuestion = async (id) => {
  const response = await axios.delete(`http://localhost:5000/questions/${id}`);
  return "Successfully deleted...";
};
