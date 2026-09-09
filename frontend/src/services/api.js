import axios from "axios";

// Local dev uses .env.local (VITE_API_URL=http://localhost:5001/api).
// Production falls back to the deployed Render backend.
const api = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL || "https://skillsync-aec5.onrender.com/api",
});

export default api;
