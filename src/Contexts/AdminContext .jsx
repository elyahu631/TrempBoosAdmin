import React, { createContext, useState, useEffect } from "react";

export const AdminContext = createContext();

export const AdminProvider = ({ children }) => {
  const [users, setAdmins] = useState([]);

  const fetchAdmins = async () => {
    return [
      {
        id: 1,
        username: "admin2",
        email: "admin2@gmail.com",
        first_name: "מנהל",
        last_name: "מערכת",
        role: "admin",
        phone_number: "058-555-9874",
        account_activated: true,
      },
      {
        id: 2,
        username: "admin2",
        email: "admin2@gmail.com",
        first_name: "מנהל",
        last_name: "מערכת",
        role: "admin",
        phone_number: "058-555-9874",
        account_activated: true,
      },
    ];
  };

  useEffect(() => {
    const getAdmins = async () => {
      const fetchedAdmins= await fetchAdmins();
      setAdmins(fetchedAdmins);
    };
    getAdmins();
  }, []);

  return (
    <AdminContext.Provider value={{ users, setAdmins }}>
      {children}
    </AdminContext.Provider>
  );
};
