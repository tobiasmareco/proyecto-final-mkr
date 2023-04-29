import axios from "axios";
console.log(import.meta.env.VITE_BACKEND_URL);
const axiosClient = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}`,
});

export default axiosClient;
