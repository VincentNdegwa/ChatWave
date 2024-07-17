import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";
import { useNavigate } from "react-router-dom";
const BackendURL = import.meta.env.VITE_BackendURL;
console.log(BackendURL);

const api = axios.create({
  baseURL: BackendURL,
});

const useCustomAxios = () => {
  const navigate = useNavigate();

  api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
      const token = localStorage.getItem("token");

      if (token) {
        config.headers = config.headers ?? {};
        config.headers["Authorization"] = `Bearer ${token}`;
      }

      return config;
    },
    (error: AxiosError) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      return response;
    },
    (error: AxiosError) => {
      if (error.response?.status === 401) {
        navigate("/login");
        localStorage.removeItem("token");
      }
      return Promise.reject(error);
    }
  );

  return api;
};

export default useCustomAxios;
// adding product they reshuffle
// 