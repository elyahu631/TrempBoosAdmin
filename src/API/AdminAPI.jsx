// src/API/AdminAPI.jsx
import axios from "axios";

const API_BASE = "http://localhost:5500/api/adminUsers";

export async function fetchAdminData(token) {
  const response = await axios.get(`${API_BASE}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map((item) => ({ ...item, id: item._id }));
}

export async function addUser(token, user, file) {
  const formData = new FormData();

  for (const key in user) {
    formData.append(key, user[key]);
  }
  formData.append("photo_URL", file);
  try {
    await axios.post(`${API_BASE}/add`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    throw error.response.data.message;
  }
}



export async function deleteUser(token, id) {
  console.log("iddddd", id);
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

export async function updateUser(token, user, file) {
  let { id, ...userWithoutId } = user;
  console.log(userWithoutId);
  const formData = new FormData();
  for (const key in userWithoutId) {
    formData.append(key, userWithoutId[key]);
  }
  if (file) {
    formData.append("photo_URL", file);
  }
  try {
    console.log(id)
    await axios.put(`${API_BASE}/updateAdmin/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
}
