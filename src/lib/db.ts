import type { AstroCookies } from "astro";
import type { Product } from "./types";
import { checkAuth, getAuthTokenCookie } from "./utils";

export async function fetchAPI(input: string, init?: RequestInit) {
  return fetch(import.meta.env.PUBLIC_API_URL + input, {
    ...init,
    headers: {
      ...init?.headers,
      Accept: "application/json",
    },
  }).then((response) => response.json());
}

export async function getAPI(input: string, init?: RequestInit) {
  return fetchAPI(input, { ...init, method: "GET" });
}
export async function getAPIWithToken(
  input: string,
  cookies: AstroCookies,
  init?: RequestInit,
) {
  if (!checkAuth(cookies)) throw Error("No auth cookie found.");
  return getAPI(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: "Token " + getAuthTokenCookie(cookies),
    },
  });
}
export async function postAPI(
  input: string,
  body?: Object | null,
  init?: RequestInit,
) {
  return fetchAPI(input, {
    ...init,
    method: "POST",
    body: JSON.stringify(body),
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });
}
export async function postAPIWithToken(
  input: string,
  cookies: AstroCookies,
  init?: RequestInit,
) {
  if (!checkAuth(cookies)) throw Error("No auth cookie found.");
  return postAPI(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: "Token " + getAuthTokenCookie(cookies),
    },
  });
}

export async function getCategories(): Promise<
  Array<{ id: number; name: string; slug: string }>
> {
  return await getAPI("products/category-list/");
}

export async function getCategoryById(id: number) {
  const categories = (await getCategories()).filter(
    (category) => category.id === id,
  );
  return categories.length !== 0 ? categories[0] : null;
}

export async function getCategoryBySlug(slug: string) {
  const categories = (await getCategories()).filter(
    (category) => category.slug === slug,
  );
  return categories.length !== 0 ? categories[0] : null;
}

export async function getProductCardsByCategoryId(
  id: number,
): Promise<Product[]> {
  const category = await getCategoryById(id);
  if (category === null) return [];
  const { slug } = category;
  const products = getProductCardsByCategorySlug(`products/category/${slug}/`);
  return products;
}

export async function getProductCardsByCategorySlug(
  slug: string,
): Promise<Product[]> {
  const products = getAPI(`products/category/${slug}/`);
  return products;
}

export async function getProductCards(): Promise<Product[]> {
  const products = getAPI("products/product-list/");
  return products;
}
