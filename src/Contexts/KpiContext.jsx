// src/contexts/KpiContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { LoginContext } from "./LoginContext";
import { fetchHitchhikerStatistics, fetchDriverStatistics } from '../API/KpiAPI';

export const KpiContext = createContext();

export const KpiProvider = ({ children }) => {
  const [hitchhikerStatistics, setHitchhikerStatistics] = useState([]);
  const [driverStatistics, setDriverStatistics] = useState([]);
  const { token } = useContext(LoginContext);

  const fetchHitchhikerStats = useCallback(async () => {
    if (token) {
      const fetchedStats = await fetchHitchhikerStatistics(token);
      setHitchhikerStatistics(fetchedStats);
    }
  }, [token]);

  const fetchDriverStats = useCallback(async () => {
    if (token) {
      const fetchedStats = await fetchDriverStatistics(token);
      setDriverStatistics(fetchedStats);
    }
  }, [token]);

  
  useEffect(() => {
    fetchHitchhikerStats();
    fetchDriverStats();
  }, [fetchHitchhikerStats, fetchDriverStats]);

  return (
    <KpiContext.Provider
      value={{ hitchhikerStatistics, driverStatistics, refreshHitchhikerStats: fetchHitchhikerStats, refreshDriverStats: fetchDriverStats }}
    >
      {children}
    </KpiContext.Provider>
  );
};
