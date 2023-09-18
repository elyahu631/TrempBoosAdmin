// // src/API/KpiAPI.jsx
import { fetchKpiData } from "./baseAPI.js";

const KPI_API = "kpis";

export const fetchTrempsStatistics = (token) => fetchKpiData(token, `${KPI_API}/get-people-and-tremps-counts`);
export const fetchAllTopFive= (token) => fetchKpiData(token, `${KPI_API}/get-all-top-five`);
export const fetchPercentages = (token) => fetchKpiData(token, `${KPI_API}/get-percentages-per-type`);
export const fetchMonthlyCounts = (token) => fetchKpiData(token, `${KPI_API}/get-hitchhiker-monthly-counts-by-gender`);
export const fetchMostActiveGroups = (token) => fetchKpiData(token, `${KPI_API}/get-most-active-groups`);
export const fetchInactiveGroups = (token) => fetchKpiData(token, `${KPI_API}/get-inactive-groups`);
