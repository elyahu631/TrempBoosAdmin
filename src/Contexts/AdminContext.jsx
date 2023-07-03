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
    await addUser(token, user);
    const fetchedAdmins = await fetchAdminData(token);
    setAdmins(fetchedAdmins);
  };

  const updateUserHandler = async (updatedUser) => {
    await updateUser(token, updatedUser);
    const fetchedAdmins = await fetchAdminData(token);
    setAdmins(fetchedAdmins);
  };
  
  return (
    <AdminContext.Provider
      value={{ adminUsers, deleteUsers, addUser: addUserHandler, updateUser: updateUserHandler }}
    >
      {children}
    </AdminContext.Provider>
  );
};
