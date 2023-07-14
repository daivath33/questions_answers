import { useState, useEffect } from "react";
import { getUsers } from "../../api/users";
import { avatarsArray } from "../../data/data";
import "./Sidebar.scss";

const Sidebar = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [users, setUsers] = useState([]);

  const getAllUsers = () => {
    setIsLoading(true);
    getUsers()
      .then((response) => {
        setUsers(response);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getAllUsers();
  }, []);

  return (
    <div className="users-box">
      <h3>All Users:</h3>
      <>
        {!isLoading &&
          users.length > 0 &&
          users.map((user, index) => (
            <div className="user-info" key={user._id}>
              <h3>{user.firstName}</h3>
              <div className="avatar-img">
                <img src={avatarsArray[index].src} alt="avatar" />
              </div>
            </div>
          ))}
      </>
    </div>
  );
};

export default Sidebar;
