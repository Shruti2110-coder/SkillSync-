import axios from "axios";

const api = axios.create({
  baseURL: "https://skillsync-aec5.onrender.com/api", // 👈 backend URL
});

export default api;
