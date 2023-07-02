import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import { LoginContext } from "./LoginContext";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [adminUsers, setAdmins] = useState([]);
  const { token } = useContext(LoginContext);

  const fetchAdminData = useCallback(async () => {
    try {
      const response = await fetch(
        "https://trempboss-nodeserver.up.railway.app/api/adminUsers/all",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.error(error);
      return [];
    }
  }, [token]); // token is a dependency of fetchAdminData

  useEffect(() => {
    const getAdmins = async () => {
      const fetchedAdmins = await fetchAdminData();
      const mappedAdmins = fetchedAdmins.map((item) => ({
        ...item,
        id: item._id,
      }));
      setAdmins(mappedAdmins);
    };
    if (token) {
      getAdmins();
    }
  }, [token, fetchAdminData]); // fetchAdminData is a dependency of this effect

  const deleteUsers = async (userIds) => {
    const responses = userIds.map(async (id) => {
      console.log('====================================');
      console.log(id);
      console.log('====================================');
      const response = await fetch(
        `https://trempboss-nodeserver.up.railway.app/api/adminUsers/markDeleted/${id}`,
        {
          method: "put",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        const message = `An error has occured: ${response.status}`;
        throw new Error(message);
      }
    });
    await Promise.all(responses);
    // re-fetch admin users after deletion
    const fetchedAdmins = await fetchAdminData();
    const mappedAdmins = fetchedAdmins.map((item) => ({
      ...item,
      id: item._id,
    }));
    setAdmins(mappedAdmins);
  };

  return (
    <AdminContext.Provider value={{ adminUsers, setAdmins, deleteUsers }}>
      {children}
    </AdminContext.Provider>
  );
};
