import type { AstroCookies } from "astro";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { tokenName } from "./constants";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getAuthTokenCookie = (cookies: AstroCookies) => {
  const token = cookies.get(tokenName)?.value;
  return token;
};
export const setAuthTokenCookie = (token: string, cookies: AstroCookies) => {
  cookies.set(tokenName, token, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 30,
    path: "/",
  });
};

export const checkAuth = (cookies: AstroCookies) => {
  if (typeof getAuthTokenCookie(cookies) === "string") return true;
  return false;
};
