// src/API/TrempAPI.js
import { fetchAllData } from "./baseAPI.js";

const TREMPS_API = "tremps";

export const fetchTrempsData = (token) => fetchAllData(token, `${TREMPS_API}/all`);
