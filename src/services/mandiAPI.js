import axios from "axios";

const API_URL = "https://mandimap-backend.onrender.com/mandis";

export async function getMandis() {
  const response = await axios.get(API_URL);
  return response.data;
}

export async function getMandiById(id) {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
}

export async function createMandi(mandi) {
  const response = await axios.post(API_URL, mandi);
  return response.data;
}

export async function updateMandi(id, mandi) {
  const response = await axios.put(
    `${API_URL}/${id}`,
    mandi
  );

  return response.data;
}

export async function deleteMandi(id) {
  const response = await axios.delete(
    `${API_URL}/${id}`
  );

  return response.data;
}