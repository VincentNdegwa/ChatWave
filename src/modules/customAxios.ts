import axios from "axios";
import { useNavigate } from "react-router-dom"; // Assuming you're using React Router for navigation

const api = axios.create({
  baseURL: "https://your-backend-api-url.com/api", // Replace with your backend API URL
});
const navigate = useNavigate();

// Add a request interceptor
api.interceptors.request.use(
  (config) => {
    // Add token to headers if available
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      navigate("/login");
      localStorage.removeItem("token");
    }
    return Promise.reject(error);
  }
);

export default api;
