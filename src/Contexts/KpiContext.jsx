// src/contexts/KpiContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { LoginContext } from "./LoginContext";
import { fetchTrempsStatistics,fetchTopHours, fetchTopDrivers, fetchTopRoots  } from '../API/KpiAPI';

export const KpiContext = createContext();

export const KpiProvider = ({ children }) => {
  const [trempsStatistics, setTrempsStatistics] = useState([]);
  const [topHours, setTopHours] = useState([]);
  const [topDrivers, setTopDrivers] = useState([]);
  const [topRoots, setTopRoots] = useState([]);

  const { token } = useContext(LoginContext);

  const fetchTrempsState = useCallback(async () => {
    if (token) {
      const fetchedStats = await fetchTrempsStatistics(token);
      setTrempsStatistics(fetchedStats);
    }
  }, [token]);

  const fetchTopHoursState = useCallback(async () => {
    if (token) {
      const fetchedHours = await fetchTopHours(token);
      setTopHours(fetchedHours);
    }
  }, [token])

  const fetchTopDriverssState = useCallback(async () => {
    if (token) {
      const fetchedDrivers= await fetchTopDrivers(token);
      setTopDrivers(fetchedDrivers);
      console.log(
        fetchedDrivers
      );
    }
  }, [token])

  const fetchTopRootsState = useCallback(async () => {
    if (token) {
      const fetchedRoots= await fetchTopRoots(token);
      setTopRoots(fetchedRoots);
    }
  }, [token])

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchData = async () => {
      await fetchTrempsState();
      await fetchTopHoursState();
      await fetchTopDriverssState(); 
      await fetchTopRootsState();  
    };
  
    // Call the async function inside useEffect
    fetchData();
  }, [fetchTrempsState, fetchTopHoursState,fetchTopDriverssState,fetchTopRootsState]);
  

  return (
    <KpiContext.Provider
    value={{ trempsStatistics, topHours,topDrivers,topRoots }} 
    >
      {children}
    </KpiContext.Provider>
  );
};
