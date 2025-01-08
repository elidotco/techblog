import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Note: This library doesn't have a default export
import Cookies from "js-cookie"; // Optional for better cookie management

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Automatically include cookies with requests
});

// Function to refresh the token
const refreshToken = async () => {
  try {
    const response = await axios.post(
      `${
        process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api"
      }/auth/refresh_token`,
      {},
      {
        withCredentials: true, // Include cookies
      }
    );

    const { accessToken } = response.data;

    // Optionally set the new access token in cookies or localStorage
    Cookies.set("token", accessToken, {
      secure: true,
      sameSite: "Strict",
    });

    return accessToken;
  } catch (error) {
    console.error("Failed to refresh token:", error);
    throw error;
  }
};

// Axios request interceptor
api.interceptors.request.use(async (config) => {
  try {
    // Retrieve the token from cookies or localStorage
    const accessToken = Cookies.get("token");

    if (accessToken) {
      // Decode the token to check expiry
      const decoded = jwtDecode(accessToken);
      const currentTime = Date.now() / 1000;

      // If the token is about to expire (e.g., within 60 seconds), refresh it
      if (decoded.exp - currentTime < 60) {
        const newAccessToken = await refreshToken();
        config.headers.Authorization = `Bearer ${newAccessToken}`;
      } else {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }
    }

    return config;
  } catch (error) {
    console.error("Error in request interceptor:", error);
    return Promise.reject(error);
  }
});

// Axios response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite loops

      try {
        const newAccessToken = await refreshToken();
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
        return api(originalRequest); // Retry the failed request
      } catch (refreshError) {
        console.error("Failed to refresh token after 401:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
