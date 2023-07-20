// src/API/UserAPI.jsx
import { fetchAllData, addData, deleteData, updateData } from "./baseAPI.js";

const USERS_API = "users";

export const fetchUsersData = (token) => fetchAllData(token, `${USERS_API}/all`);
export const addUser = (token, user, file) => addData(token, user, file, `${USERS_API}/admin-add-user`, "image_URL");
export const deleteUser = (token, id) => deleteData(token, id, `${USERS_API}/markDeleted`);
export const updateUser = (token, user, file) => updateData(token, user, file, `${USERS_API}/update-user`, "image_URL");
