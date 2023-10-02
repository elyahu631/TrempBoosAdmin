// baseAPI.js
import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL;

async function fetchAllData(token, url) {
  const response = await axios.get(`${API_BASE}/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data.map((item) => ({ ...item, id: item._id }));
}

async function addData(token, data, file, url, fileKey) {
  const formData = new FormData();
  for (const key in data) {
    // Stringify all object and array values
    if (typeof data[key] === 'object') {
      formData.append(key, JSON.stringify(data[key]));
    } else {
      formData.append(key, data[key]);
    }
  }
  formData.append(fileKey, file);
  try {
    return (await axios.post(`${API_BASE}/${url}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    })).data;
  } catch (error) {
    return (error.response.data); 
  }
}


async function deleteData(token, id, url) {
  try {
    await axios.put(
      `${API_BASE}/${url}/${id}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
  } catch (error) {
    console.error("Error deleting item:", error);
  }
}

async function updateData(token, data, file, url, fileKey) {
  let { id, ...dataWithoutId } = data;
  const formData = new FormData();
  for (const key in dataWithoutId) {
    formData.append(key, JSON.stringify(dataWithoutId[key]));
  }
  if (file) {
    formData.append(fileKey, file);
  }
  
  try {
    return await axios.put(`${API_BASE}/${url}/${id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return (error.response.data); 
   }
}

async function updateDataOnly(token,id, url) {
  try {
    return await axios.put(`${API_BASE}/${url}/${id}`, {}, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  } catch (error) {
    return (error.response.data);
  }
}

async function fetchKpiData(token, url) {
  const response = await axios.get(`${API_BASE}/${url}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data.data;
}

async function postData(token, url,data = {startDate:"2023-05-20T00:00:00Z",endDate:"2023-10-23T23:59:59Z"}) {
  try {
    return (await axios.post(`${API_BASE}/${url}`, data, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    })).data.data;
  } catch (error) {
    return (error.response.data); 
  }
}

export { fetchAllData, addData, deleteData, updateData,updateDataOnly,fetchKpiData,postData };




















