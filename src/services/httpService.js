import axios from "axios";
import { toast } from "react-toastify";

axios.interceptors.response.use(null, (e) => {
  if (!(e.response && e.response.status >= 400 && e.response.status < 500)) {
    console.log("Unexpected server error:", e);
    toast.error("An unexpected server error occurred, pester Mel on Discord!");
  }
  return Promise.reject(e);
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
};
