import type { AstroCookies, AstroGlobal } from "astro";
import { actions } from "astro:actions";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tokenName } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setAuthToken = async (token: string) => {
  const response = await actions.setTokenCookie({ token });
  if (response.data?.success) localStorage.setItem("token", token);
  return response.data;
};
export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};

export const getAuthTokenCookie = (cookies: AstroCookies) => {
  const token = cookies.get(tokenName)?.value;
  return token;
};

export const checkAuth = (cookies: AstroCookies) => {
  if (typeof getAuthTokenCookie(cookies) === "string") return true;
  return false;
};
