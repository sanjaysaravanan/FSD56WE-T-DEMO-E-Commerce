import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  timeout: 10000,
  headers: {
    "Customer-Header": "Hi Heloo",
  },
});

export default instance;
