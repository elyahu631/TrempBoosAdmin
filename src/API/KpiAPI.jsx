// src/API/KpiAPI.jsx
import { fetchKpiData } from "./baseAPI.js";

const KPI_API = "kpis";

export const fetchHitchhikerStatistics = (token) => fetchKpiData(token, `${KPI_API}/hitchhikers`);
export const fetchDriverStatistics = (token) => fetchKpiData(token, `${KPI_API}/drivers`);
