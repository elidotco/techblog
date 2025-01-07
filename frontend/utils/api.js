import axios from "axios";
import { jwtDecode } from "jwt-decode"; // Note: This library doesn't have a default export
import Cookies from "js-cookie"; // Optional for better cookie management

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true, // Automatically include cookies with requests
});

export default api;

//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
