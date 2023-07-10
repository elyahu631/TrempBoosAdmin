// src/API/AdminAPI.jsx
import axios from "axios";

const API_BASE = "http://localhost:5500/api/gifts";

export async function fetchGiftsData(token) {
  const response = await axios.get(`${API_BASE}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map((item) => ({ ...item, id: item._id }));
}

export async function deleteGift(token, id) {
  try {
    let res = await axios.put(
      `${API_BASE}/markDeleted/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(res);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

export async function addGift(token, gift, file) {
  const formData = new FormData();

  for (const key in gift) {
    formData.append(key, gift[key]);
  }
  formData.append("gift_image", file);
  try {
    await axios.post(`${API_BASE}/add-gift`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error.response.data.message;
  }
}

export async function updateGift(token, gift, file) {
  let { id, ...giftWithoutId } = gift;
  console.log(id);
  const formData = new FormData();
  for (const key in giftWithoutId) {
    formData.append(key, giftWithoutId[key]);
  }
  if (file) {
    formData.append("gift_image", file);
  }
  try {
    console.log(id)
    await axios.put(`${API_BASE}/update-gift/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
}