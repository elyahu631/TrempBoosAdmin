// // src/API/KpiAPI.jsx
import { fetchKpiData } from "./baseAPI.js";

const KPI_API = "kpis";

export const fetchTrempsStatistics = (token) => fetchKpiData(token, `${KPI_API}/get-people-and-tremps-counts`);
export const fetchTopHours = (token) => fetchKpiData(token, `${KPI_API}/get-top-hours`);
export const fetchTopDrivers = (token) => fetchKpiData(token, `${KPI_API}/get-top-drivers`);
export const fetchTopRoots = (token) => fetchKpiData(token, `${KPI_API}/get-top-routes`);
export const fetchPercentages = (token) => fetchKpiData(token, `${KPI_API}/get-percentages-per-type`);
export const fetchMonthlyCounts = (token) => fetchKpiData(token, `${KPI_API}/get-hitchhiker-monthly-counts-by-gender`);
export const fetchMostActiveGroups = (token) => fetchKpiData(token, `${KPI_API}/get-most-active-groups`);
