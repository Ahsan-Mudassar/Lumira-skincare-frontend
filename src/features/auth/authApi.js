import apiClient from "../../services/apiClient";

export const login = (credentials) => apiClient.post("/auth/login", credentials);
export const logout = () => apiClient.post("/auth/logout");

export async function getMe() {
  try {
    const res = await apiClient.get("/auth/me");
    return res.data;
  } catch (error) {
    if (error.status === 401) return null;
    throw error;
  }
}
