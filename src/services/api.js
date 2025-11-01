import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:3001/api", // ✅ mesma porta do backend
  timeout: 10000, // aumente para evitar timeout
});

export default api;
