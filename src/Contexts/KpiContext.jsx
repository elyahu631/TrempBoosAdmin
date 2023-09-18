// src/contexts/KpiContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { LoginContext } from "./LoginContext";
import { fetchTrempsStatistics,fetchPercentages, fetchMonthlyCounts, fetchMostActiveGroups, fetchInactiveGroups, fetchAllTopFive } from '../API/KpiAPI';

export const KpiContext = createContext();

export const KpiProvider = ({ children }) => {
  const [trempsStatistics, setTrempsStatistics] = useState([]);
  const [topFive, setTopFive] = useState([]);
  const [percentages, setPercentages] = useState([]);
  const [monthlyCounts, setMonthlyCounts] = useState([]);
  const [mostActiveGroups, setMostActiveGroups] = useState([]);
  const [inactiveGroups, setInactiveGroups] = useState([]);

  const { token } = useContext(LoginContext);

  const fetchTrempsState = useCallback(async () => {
    if (token) {
      const fetchedStats = await fetchTrempsStatistics(token);
      setTrempsStatistics(fetchedStats);
    }
  }, [token]);


  const fetchTopFiveState = useCallback(async () => {
    if (token) {
      const fetchedTopFive  = await fetchAllTopFive(token);
      setTopFive(fetchedTopFive);
    }
  }, [token])

  const fetchPercentagesState = useCallback(async () => {
    if (token) {
      const fetchedPercentages = await fetchPercentages(token);
      setPercentages(fetchedPercentages);
    }
  }, [token])

  const fetchMonthlyCountsState = useCallback(async () => {
    if (token) {
      const fetchedMonthlyCounts = await fetchMonthlyCounts(token);
      setMonthlyCounts(fetchedMonthlyCounts);
    }
  }, [token]);


  const fetchMostActiveGroupsState = useCallback(async () => {
    if (token) {
      const fetchedGroups = await fetchMostActiveGroups(token);
      setMostActiveGroups(fetchedGroups.slice(0, 5));
    }
  }, [token]);

  const fetchInactiveGroupsState = useCallback(async () => {
    if (token) {
      const fetchedGroups = await fetchInactiveGroups(token);
      setInactiveGroups(fetchedGroups);
    }
}, [token]);

  useEffect(() => {
    // Define the async function inside useEffect
    const fetchData = async () => {
      await fetchTrempsState();
      await fetchTopFiveState();
      await fetchPercentagesState();
      await fetchMonthlyCountsState();
      await fetchMostActiveGroupsState();
      await fetchInactiveGroupsState(); 
    };

    // Call the async function inside useEffect
    fetchData();
  }, [fetchTrempsState, fetchTopFiveState, fetchPercentagesState, fetchMonthlyCountsState, fetchMostActiveGroupsState,fetchInactiveGroupsState]); // Add fetchMostActiveGroupsState to the dependency array


  return (
    <KpiContext.Provider
      value={{ trempsStatistics, topFive, percentages, monthlyCounts, mostActiveGroups,inactiveGroups }}
    >
      {children}
    </KpiContext.Provider>
  );
};
