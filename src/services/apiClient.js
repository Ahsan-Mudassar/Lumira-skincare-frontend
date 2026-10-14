import axios from "axios"
import { normalizeError } from "./apiError";
import { queryClient } from "./queryClient.js";
import { queryKeys } from "../constants/queryKeys.js";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
    timeout: 15000
})

api.interceptors.response.use(
    (response) => response.data,
    (error) => {
        const apiError = normalizeError(error);

        const isLoginRequest = error.config?.url?.includes("/auth/login");
        if (apiError.status === 401 && !isLoginRequest) {
            queryClient.setQueriesData(queryKeys.auth.me, null)
        }

        return Promise.reject(apiError)
    }
)

export default api;