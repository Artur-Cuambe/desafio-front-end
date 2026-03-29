import { ACCESS_TOKEN } from "@/constant";
import { jwtDecode } from "jwt-decode";

export function setToken(token: string) {
  localStorage.setItem(ACCESS_TOKEN, token);
}

export function getToken() {
  return localStorage.getItem(ACCESS_TOKEN);
}

export function clearToken() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.clear()
}

export function isTokenNotExpired() {
  try {
    const token = localStorage.getItem(ACCESS_TOKEN);
    const decoded = jwtDecode(`${token}`);
    const currentTime = Math.floor(Date.now() / 1000);
    if (decoded.exp && decoded.exp > currentTime) {
      return true;
    }

    return false;
  } catch (error) {
    console.error("Error verifying token:", error);
    return false;
  }
}
