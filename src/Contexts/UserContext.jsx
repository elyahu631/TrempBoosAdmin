import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { LoginContext } from "./LoginContext";
import { addUser, deleteUser, fetchUsersData, updateUser } from '../API/UsersAPI';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [users, setUsers] = useState([]);
  const { token } = useContext(LoginContext);

  const getUserWithoutCheckToken = async () => {
    const fetchedUsers = await fetchUsersData(token);
    setUsers(fetchedUsers);
  }


  const getUsers = useCallback(async () => { 
    if (token) {
      const fetchedUsers = await fetchUsersData(token);
      setUsers(fetchedUsers);
    }
  }, [token]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const deleteUsers = async (userIds) => {
    await Promise.all(userIds.map(id => deleteUser(token, id)));
    getUserWithoutCheckToken();
  };

  const addUserHandler = async (user) => {
    const { image_URL, ...otherProps } = user;
    let res = await addUser(token, otherProps, image_URL);
      if (res.status){
        getUserWithoutCheckToken();
      }
      return res;
  };

  const updateUserHandler = async (updatedUser, file) => {
    let res =   await updateUser(token, updatedUser, file);
    if (res.status) {
      getUserWithoutCheckToken();
    }
    return res;
  };

  return (
    <UserContext.Provider
      value={{ users, refreshUsers: getUsers, deleteUsers, addUser: addUserHandler, updateUser: updateUserHandler }} 
    >
      {children}
    </UserContext.Provider>
  );
};
