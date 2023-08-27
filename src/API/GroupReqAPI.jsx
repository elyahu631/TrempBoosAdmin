// src/API/GroupReqAPI.jsx
import {fetchAllData} from './baseAPI.js';
const GROUP_REQ_API = "group-request";
export const fetchGroupReqsData = (token) => fetchAllData(token, `${GROUP_REQ_API}/unapproved-requests`);
