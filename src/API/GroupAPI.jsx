// src/API/GroupAPI.jsx
import { fetchAllData, addData, deleteData, updateData } from "./baseAPI.js";
const GROUPS_API = "groups";
export const fetchGroupsData = (token) => fetchAllData(token, `${GROUPS_API}/all`);
export const addGroup = (token, group, file) => addData(token, group, file, `${GROUPS_API}/add-group`, "image_URL");
export const deleteGroup = (token, id) => deleteData(token, id, `${GROUPS_API}/markDeleted`);
export const updateGroup = (token, group, file) => updateData(token, group, file, `${GROUPS_API}/update-group`, "image_URL");
