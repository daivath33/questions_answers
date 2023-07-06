import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser, loginUser } from "../api/users";

const UserContext = createContext({
  user: null,
  isLoggedIn: false,
  handleLogin: () => null,
  handleLogout: () => null,
  handleRegister: () => null,
  handleUpdateUser: () => null,
});

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("user")));
  const isLoggedIn = !!user;

  const navigate = useNavigate();

  const handleLogin = (user, setError) => {
    loginUser(user)
      .then((response) => {
        const existingUser = response.user;
        if (existingUser) {
          setUser(existingUser);
          localStorage.setItem("user", JSON.stringify(existingUser));
          navigate("/");
        } else {
          setError(response.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.setItem("user", null);
    navigate("/");
  };

  const handleRegister = (newUser) => {
    registerUser(newUser)
      .then(() => {
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const handleUpdateUser = () => {};
  return (
    <UserContext.Provider
      value={{
        user,
        isLoggedIn,
        handleLogin,
        handleLogout,
        handleRegister,
        handleUpdateUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };
