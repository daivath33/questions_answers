import axios from "axios";

export const registerUser = async (user) => {
  const response = await axios.post(
    "http://localhost:5000/auth/register",
    user
  );
  return response.data;
};

export const loginUser = async (user) => {
  const response = await axios.post("http://localhost:5000/auth/login", user);
  return response.data;
};

export const getUsers = async () => {
  const response = await axios.get("http://localhost:5000/users");
  return response.data;
};
