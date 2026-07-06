import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const setAuthToken = (token: string) => {
  localStorage.setItem("token", token);
};
export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token;
};
