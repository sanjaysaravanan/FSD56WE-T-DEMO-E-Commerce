import axios from "axios";

const instance = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
  timeout: 10000,
  headers: {
    "Customer-Header": "Hi Heloo",
  },
});

instance.interceptors.request.use(
  (config) => {
    config.headers["Authorization"] = localStorage.getItem("authToken");
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default instance;
