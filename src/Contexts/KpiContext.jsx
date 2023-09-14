// src/contexts/KpiContext.jsx
import React, { createContext, useState, useEffect, useContext, useCallback } from "react";
import { LoginContext } from "./LoginContext";
import { fetchTrempsStatistics, fetchTopHours, fetchTopDrivers, fetchTopRoots, fetchPercentages, fetchMonthlyCounts, fetchMostActiveGroups, fetchInactiveGroups } from '../API/KpiAPI';

export const KpiContext = createContext();

export const KpiProvider = ({ children }) => {
  const [trempsStatistics, setTrempsStatistics] = useState([]);
  const [topHours, setTopHours] = useState([]);
  const [topDrivers, setTopDrivers] = useState([]);
  const [topRoots, setTopRoots] = useState([]);
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

  const fetchTopHoursState = useCallback(async () => {
    if (token) {
      const fetchedHours = await fetchTopHours(token);
      setTopHours(fetchedHours);
    }
  }, [token])

  const fetchTopDriverssState = useCallback(async () => {
    if (token) {
      const fetchedDrivers = await fetchTopDrivers(token);
      setTopDrivers(fetchedDrivers);
      console.log(
        fetchedDrivers
      );
    }
  }, [token])

  const fetchTopRootsState = useCallback(async () => {
    if (token) {
      const fetchedRoots = await fetchTopRoots(token);
      setTopRoots(fetchedRoots);
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
      await fetchTopHoursState();
      await fetchTopDriverssState();
      await fetchTopRootsState();
      await fetchPercentagesState();
      await fetchMonthlyCountsState();
      await fetchMostActiveGroupsState();
      await fetchInactiveGroupsState(); 
    };

    // Call the async function inside useEffect
    fetchData();
  }, [fetchTrempsState, fetchTopHoursState, fetchTopDriverssState, fetchTopRootsState, fetchPercentagesState, fetchMonthlyCountsState, fetchMostActiveGroupsState,fetchInactiveGroupsState]); // Add fetchMostActiveGroupsState to the dependency array


  return (
    <KpiContext.Provider
      value={{ trempsStatistics, topHours, topDrivers, topRoots, percentages, monthlyCounts, mostActiveGroups,inactiveGroups }}
    >
      {children}
    </KpiContext.Provider>
  );
};
