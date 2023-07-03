import axios from "axios";

const API_BASE = "https://trempboss-nodeserver.up.railway.app/api/adminUsers";

export async function fetchAdminData(token) {
  const response = await axios.get(`${API_BASE}/all`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.map((item) => ({ ...item, id: item._id }));
}
export async function addUser(token, user) {
  await axios.post(`${API_BASE}/add`, user, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export async function deleteUser(token, id) {
  try {
    await axios.put(
      `${API_BASE}/markDeleted/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error deleting user:", error);
  }
}

export async function updateUser(token, user) {
  let { id, ...userWithoutId } = user;
  try {
    await axios.put(`${API_BASE}/updateAdmin/${id}`, userWithoutId, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
}
