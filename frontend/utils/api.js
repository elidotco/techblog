import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api", // Backend API URL
  withCredentials: true, // Important for sending cookies with requests
});
// Interceptor to handle token refreshing
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  async (error) => {
    if (error.response?.status === 401 && !error.config._retry) {
      error.config._retry = true;

      try {
        // Call the refresh-token endpoint
        const { data } = await api.post("/auth/refresh-token");
        console.log(data.accessToken);
        localStorage.setItem("token", data.accessToken);
        api.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${data.accessToken}`;
        error.config.headers["Authorization"] = `Bearer ${data.accessToken}`;

        return api(error.config);
      } catch (refreshError) {
        console.error("Error refreshing token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
