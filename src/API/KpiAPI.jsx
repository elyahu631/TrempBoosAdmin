// // src/API/KpiAPI.jsx
import { fetchKpiData, postData } from "./baseAPI.js";

const KPI_API = "kpis";

export const fetchTrempsStatistics = (token,filter) => postData(token, `${KPI_API}/get-people-and-tremps-counts`,filter);
export const fetchAllTopFive= (token,filter) => postData(token, `${KPI_API}/get-all-top-five`,filter);
export const fetchPercentages = (token,filter) => postData(token, `${KPI_API}/get-percentages-per-type`,filter);
export const fetchMonthlyCounts = (token,filter) => postData(token, `${KPI_API}/get-hitchhiker-monthly-counts-by-gender`,filter);
export const fetchMostActiveGroups = (token) => fetchKpiData(token, `${KPI_API}/get-most-active-groups`);
export const fetchInactiveGroups = (token) => fetchKpiData(token, `${KPI_API}/get-inactive-groups`);
