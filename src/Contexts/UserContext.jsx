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

  const getUsers = useCallback(async () => { // Use useCallback here
    if (token) {
      const fetchedUsers = await fetchUsersData(token);
      setUsers(fetchedUsers);
    }
  }, [token]); // It depends on 'token'

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const deleteUsers = async (userIds) => {
    await Promise.all(userIds.map(id => deleteUser(token, id)));
    const fetchedUsers = await fetchUsersData(token);
    setUsers(fetchedUsers);
  };

  const addUserHandler = async (user) => {
    const { photo_URL, ...otherProps } = user;
    try {
      await addUser(token, otherProps, photo_URL);
      const fetchedUsers = await fetchUsersData(token);
      setUsers(fetchedUsers);
    } catch (error) {
      return error;
    }
  };

  const updateUserHandler = async (updatedUser, file) => {
    try {
      await updateUser(token, updatedUser, file);
      console.log(file);
      const fetchedUsers = await fetchUsersData(token);
      setUsers(fetchedUsers);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };

  return (
    <UserContext.Provider
      value={{ users, refreshUsers: getUsers, deleteUsers, addUser: addUserHandler, updateUser: updateUserHandler }} // Provide getUsers as refreshAdmins
    >
      {children}
    </UserContext.Provider>
  );
};