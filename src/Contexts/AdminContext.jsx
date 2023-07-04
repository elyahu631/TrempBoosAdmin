import React, {
  createContext,
  useState,
  useEffect,
  useContext,
} from "react";
import { LoginContext } from "./LoginContext";
import { fetchAdminData, deleteUser, addUser, updateUser } from '../API/AdminAPI';

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminUsers, setAdmins] = useState([]);
  const { token } = useContext(LoginContext);

  useEffect(() => {
    const getAdmins = async () => {
      if (token) {
        const fetchedAdmins = await fetchAdminData(token);
        setAdmins(fetchedAdmins);
      }
    };
    getAdmins();
  }, [token]);

  const deleteUsers = async (userIds) => {
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
      const fetchedAdmins = await fetchAdminData(token);
      setAdmins(fetchedAdmins);
    } catch (error) {
      console.error("Error updating user:", error);
    }
  };
  
  return (
    <AdminContext.Provider
      value={{ adminUsers, deleteUsers, addUser: addUserHandler, updateUser: updateUserHandler }}
    >
      {children}
    </AdminContext.Provider>
  );
};
