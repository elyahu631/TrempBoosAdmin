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

  const getAdminWithoutToken = async () => {
    const fetchedAdmins = await fetchAdminData(token);
    setAdmins(fetchedAdmins);
  }


  const getAdmins = useCallback(async () => { 
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
    getAdminWithoutToken();
  };

  const addUserHandler = async (user) => {
    const { image_URL, ...otherProps } = user;
      let res = await addUser(token, otherProps, image_URL);
      if (res.status){
        getAdminWithoutToken();
      }
      return res;
  };

  const updateUserHandler = async (updatedUser, file) => {
    let res =   await updateUser(token, updatedUser, file);
    if (res.status) {
      getAdminWithoutToken();
    }
    return res;
  };


  return (
    <AdminContext.Provider
      value={{ adminUsers, deleteUsers, addUser: addUserHandler, updateUser: updateUserHandler, refreshAdmins: getAdmins }} // Provide getAdmins as refreshAdmins
    >
      {children}
    </AdminContext.Provider>
  );
};
