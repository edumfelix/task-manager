import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:44493/api/Tasks",
});

export default api;