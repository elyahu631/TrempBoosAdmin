// src/API/AdminAPI.jsx
import { fetchAllData, addData, deleteData, updateData } from "./baseAPI.js";

const ADMIN_USERS_API = "adminUsers";

export const fetchAdminData = (token) => fetchAllData(token, `${ADMIN_USERS_API}/all`);
export const addUser = (token, user, file) => addData(token, user, file, `${ADMIN_USERS_API}/add`, "image_URL");
export const deleteUser = (token, id) => deleteData(token, id, `${ADMIN_USERS_API}/markDeleted`);
export const updateUser = (token, user, file) => updateData(token, user, file, `${ADMIN_USERS_API}/updateAdmin`, "image_URL");
