"use client";

// Auth Context
import api, { scheduleTokenRefresh } from "@/utils/api";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { createContext, useState, useEffect } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state

  // Login Function
  const login = async (email, password) => {
    try {
      // Send login request
      const response = await api.post("/auth/login", { email, password });
      const accessToken = response.data.accessToken;

      // Set Authorization header for API requests
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Option 1: Store token in cookie

      // Option 2: Or save it temporarily in memory (less secure than cookies)
      // memoryTokenStore = accessToken; // Use a global variable or state

      // Schedule token refresh

      // Fetch user data
      const { data: userData } = await api.get("/auth/profile");
      setUser(userData.user);

      // Redirect user based on role
      if (userData.user.role === "admin") {
        router.push("/admin-dashboard");
      } else {
        router.push("/profile");
      }

      return { success: true };
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
      };
    }
  };

  const getCookie = (cookieName) => {
    const cookies = document.cookie.split("; ");
    const cookie = cookies.find((c) => c.startsWith(`${cookieName}=`));
    return cookie ? cookie.split("=")[1] : null;
  };

  // Logout Function
  const logout = async () => {
    try {
      await api.post("/auth/logout");
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      setUser(null);
      router.push("/login");
    } catch (err) {
      console.error("Failed to log out:", err);
    }
  };

  // On Load: Fetch User Data (if Token Exists)

  //   check if the access token is expired or not and get the resfresh token from the cookie and send it to the backend to get a new access token
  // Token Refresh Function
  const refreshToken = async () => {
    try {
      const { data } = await api.post("/auth/refresh-token");
      const accessToken = data.accessToken;
      localStorage.setItem("token", accessToken);
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      return accessToken;
    } catch (err) {
      console.error("Error refreshing token:", err);
      return null;
    }
  };
  // the refreshToken function will be used in the interceptor to refresh the token when it expires

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true);
      try {
        const res = await api.get("/auth/profile");
        setUser(res.data.user);
        console.log(res);
      } catch (error) {
        console.error(error); // Log the error properly
      } finally {
        setLoading(false); // Ensure loading state is cleared
      }
    };

    fetchProfile();
  }, []);

  // Loading UI
  if (loading) {
    return <div>Loading</div>;
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth Hook
export const useAuth = () => React.useContext(AuthContext);
