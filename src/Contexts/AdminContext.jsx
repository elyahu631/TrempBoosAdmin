import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { LoginContext } from "./LoginContext";
import { fetchAdminData, deleteUser, addUser, updateUser } from '../API/AdminAPI';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminUsers, setAdmins] = useState([]);
  const { token } = useContext(LoginContext);

  const getAdmins = useCallback(async () => { // Use useCallback here
    if (token) {
      const fetchedAdmins = await fetchAdminData(token);
      setAdmins(fetchedAdmins);
    }
  }, [token]); // It depends on 'token'

  useEffect(() => {
    getAdmins();
  }, [getAdmins]);


  const deleteUsers = async (userIds) => {
    console.log(userIds);
    await Promise.all(userIds.map(id => deleteUser(token, id)));
    const fetchedAdmins = await fetchAdminData(token);
    setAdmins(fetchedAdmins);
  };

  const addUserHandler = async (user) => {
    const { photo_URL, ...otherProps } = user;
    try {
      await addUser(token, otherProps, photo_URL);
      const fetchedAdmins = await fetchAdminData(token);
      setAdmins(fetchedAdmins);
    } catch (error) {
      return error;
    }
  };
  
  

  const updateUserHandler = async (updatedUser, file) => {
    try {
      await updateUser(token, updatedUser, file);
      console.log(file);
      const fetchedAdmins = await fetchAdminData(token);
      setAdmins(fetchedAdmins);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  return (
    <AdminContext.Provider
      value={{ adminUsers, deleteUsers, addUser: addUserHandler, updateUser: updateUserHandler, refreshAdmins: getAdmins }} // Provide getAdmins as refreshAdmins
    >
      {children}
    </AdminContext.Provider>
  );
};
