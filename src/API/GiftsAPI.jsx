// src/API/GiftsAPI.jsx

import { fetchAllData, addData, deleteData, updateData } from "./baseAPI.js";

const GIFTS_API = "gifts";

export const fetchGiftsData = (token) => fetchAllData(token, `${GIFTS_API}/all`);
export const addGift = (token, gift, file) => addData(token, gift, file, `${GIFTS_API}/add-gift`, "gift_image");
export const deleteGift = (token, id) => deleteData(token, id, `${GIFTS_API}/markDeleted`);
export const updateGift = (token, gift, file) => updateData(token, gift, file, `${GIFTS_API}/update-gift`, "gift_image");
