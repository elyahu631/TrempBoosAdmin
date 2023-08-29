// src/API/GroupReqAPI.jsx
import {fetchAllData, updateDataOnly} from './baseAPI.js';
const GROUP_REQ_API = "group-request";
export const fetchGroupReqsData = (token) => fetchAllData(token, `${GROUP_REQ_API}/unapproved-requests`);
export const updateGroupReqsData = (token,id) => updateDataOnly(token,id,`${GROUP_REQ_API}/approve`);
export const denyGroupReqsData = (token,id) => updateDataOnly(token,id,`${GROUP_REQ_API}/deny`);
