// src/context/TrempContext.js
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { LoginContext } from "./LoginContext";
import { fetchTrempsData } from '../API/TrempAPI';

export const TrempContext = createContext();

export const TrempProvider = ({ children }) => {
  const [tremps, setTremps] = useState([]);
  const { token } = useContext(LoginContext);

  const getTremps = useCallback(async () => {
    if (token) {
      const fetchedTremps = await fetchTrempsData(token);
      setTremps(fetchedTremps);
    }
  }, [token]);

  useEffect(() => {
    getTremps();
  }, [getTremps]);

  return (
    <TrempContext.Provider
      value={{ tremps, refreshTremps: getTremps }} 
    >
      {children}
    </TrempContext.Provider>
  );
};
