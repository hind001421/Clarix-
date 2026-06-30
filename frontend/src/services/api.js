import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? "http://127.0.0.1:8000";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000
});

export async function uploadContractFile(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient.post("/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" }
  });

  return response.data;
}

export async function analyzeContractText(text) {
  const response = await apiClient.post("/analyze", { text });
  return response.data;
}

export function getReadableApiError(error, fallback) {
  const detail = error?.response?.data?.detail;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    return detail.map((item) => item.msg || item.message || String(item)).join(" ");
  }
  if (error?.code === "ERR_NETWORK") {
    return "Backend is not running. Please start FastAPI on http://127.0.0.1:8000";
  }
  return error?.message || fallback;
}
