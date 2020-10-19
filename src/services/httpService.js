import axios from "axios";
import { toast } from "react-toastify";
import * as https from "https";

axios.interceptors.response.use(null, (e) => {
  if (!(e.response && e.response.status >= 400 && e.response.status < 500)) {
    console.error("Unexpected server error:", e);
    toast.error("An unexpected server error occurred, pester Mel on Discord!");
  }
  return Promise.reject(e);
});

const options = {};
if (process.env.NODE_ENV !== "production") {
  options.httpsAgent = new https.Agent({
    rejectUnauthorized: false,
  });
}

function setJwt(jwt) {
  axios.defaults.headers.common["x-auth-token"] = jwt;
}

async function get(url) {
  const { data } = await axios.get(url, options);
  return data;
}

async function post(url, data) {
  const { data: created } = await axios.post(url, data, options);
  return created;
}

async function put(url, data) {
  const { data: updated } = await axios.put(url, data, options);
  return updated;
}

export default {
  get,
  post,
  put,
  setJwt,
};
