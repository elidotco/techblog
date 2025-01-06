import axios from "axios";
import { jwtDecode } from "jwt-decode";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", // Backend API URL
  withCredentials: true, // Important for sending cookies with requests
});
// Interceptor to handle token refreshing
let refreshTimer;

const scheduleTokenRefresh = (accessToken) => {
  const decodedToken = jwtDecode(accessToken);
  const expirationTime = decodedToken.exp * 1000; // Convert to milliseconds
  const currentTime = Date.now();
  const refreshTime = expirationTime - currentTime - 60 * 1000; // Refresh 1 minute before expiration

  // Clear any existing timer
  if (refreshTimer) clearTimeout(refreshTimer);

  if (refreshTime > 0) {
    refreshTimer = setTimeout(async () => {
      try {
        const { data } = await api.post("/auth/refresh-token");
        console.log("Token refreshed:", data.accessToken);

        // Update token in localStorage and Axios headers
        localStorage.setItem("token", data.accessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;

        // Schedule the next refresh
        scheduleTokenRefresh(data.accessToken);
      } catch (error) {
        console.error("Error refreshing token:", error);
        // Handle logout or other error-handling logic here
      }
    }, refreshTime);
  }
};

// Interceptor to refresh token on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        const { data } = await api.post("/auth/refresh-token");
        console.log("Token refreshed on 401:", data.accessToken);

        localStorage.setItem("token", data.accessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;

        // Schedule the next refresh
        scheduleTokenRefresh(data.accessToken);

        return api(error.config); // Retry the original request
      } catch (refreshError) {
        console.error("Error refreshing token after 401:", refreshError);
        // Handle logout or other error-handling logic here
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

// Call this after login or when initializing the app
const initializeTokenRefresh = () => {
  const token = localStorage.getItem("token");
  if (token) {
    scheduleTokenRefresh(token);
  }
};

// Initialize on app start
initializeTokenRefresh();

export default api;
