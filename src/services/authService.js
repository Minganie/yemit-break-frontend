import http from "./httpService";
import { toast } from "react-toastify";
import jwtDecode from "jwt-decode";

import config from "../config";

const key = "token";

http.setJwt(getJwt());

export async function register(account) {
  try {
    const { data } = await http.post(config.api + "users", account);
    localStorage.setItem(key, data.jwt);
    return data;
  } catch (e) {
    const { data } = e.response;
    toast.error(data.message);
    return false;
  }
}

export async function login(email, password) {
  try {
    const { data } = await http.post(config.api + "users/login", {
      email,
      password,
    });
    localStorage.setItem(key, data.jwt);
    return data;
  } catch (e) {
    const { data } = e.response;
    toast.error(data.message);
    return false;
  }
}

export function logout() {
  localStorage.removeItem(key);
}

export function getCurrentUser() {
  try {
    const jwt = localStorage.getItem(key);
    return jwtDecode(jwt);
  } catch (e) {
    return null;
  }
}

export function getJwt() {
  return localStorage.getItem(key);
}

export default {
  register,
  login,
  logout,
  getCurrentUser,
  getJwt,
};
