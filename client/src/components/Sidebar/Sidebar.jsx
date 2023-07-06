import { useContext, useState, useEffect } from "react";
import { UserContext } from "../../context/UserContext";
import { getUsers } from "../../api/users";
import Avatar1 from "../../assets/u1.jpg";

import "./Sidebar.scss";

const Sidebar = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const getAllUsers = () => {
      setIsLoading(true);
      getUsers()
        .then((response) => {
          setUsers(response);
        })
        .catch((err) => console.log(err))
        .finally(setIsLoading(false));
    };
    getAllUsers();
  }, []);

  return (
    <div className="users-box">
      <>
        {!isLoading &&
          users.map((user) => (
            <div className="user-info">
              <h3>{user.firstName}</h3>
              <div className="avatar-img">
                <img src={Avatar1} />
              </div>
            </div>
          ))}
      </>
    </div>
  );
};

export default Sidebar;
