"use client";

// Auth Context
import api from "@/utils/api";
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
      const response = await api.post("/auth/login", { email, password });
      const accessToken = response.data.accessToken;

      // Save token to localStorage
      localStorage.setItem("token", accessToken);

      // Set Authorization header for API requests
      api.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;

      // Fetch user data
      const { data: userData } = await api.get("/auth/profile");
      setUser(userData.user);

      // Redirect to profile page
      router.push("/profile");
      return true;
    } catch (err) {
      return false;
    }
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
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Set default authorization header
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

      // Fetch user profile
      api
        .get("/auth/profile")
        .then((response) => {
          setUser(response.data.user);
        })
        .catch((error) => {
          localStorage.removeItem("token"); // Remove token if it's invalid
        })
        .finally(() => setLoading(false)); // Mark loading as complete
    } else {
      setLoading(false); // No token, skip loading
    }
  }, []);
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

  // Loading UI
  if (loading) {
    return <div>Loading...</div>; // Or a more styled loading spinner
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// useAuth Hook
export const useAuth = () => React.useContext(AuthContext);
