import http from "./httpService";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

export async function login(email, password) {
  try {
    const { data } = await http.post("api/users/login", { email, password });
    localStorage.setItem("token", data.jwt);
    return data;
  } catch (e) {
    const { data } = e.response;
    toast.error(data.message);
  }
}

export function logout() {
  localStorage.removeItem("token");
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem("token");
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}

export default {
  login,
  logout,
  getCurrentUser,
};
