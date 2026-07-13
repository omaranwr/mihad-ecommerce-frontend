import type { Product } from "./types";
import { getAuthToken, setAuthToken } from "./utils";

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
export async function getAPIWithToken(input: string, init?: RequestInit) {
  return getAPI(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: "Token " + getAuthToken(),
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
export async function postAPIWithToken(input: string, init?: RequestInit) {
  return postAPI(input, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: "Token " + getAuthToken(),
    },
  });
}

export async function getCategories(): Promise<
  Array<{ id: number; name: string; slug: string }>
> {
  return await getAPI("/products/category-list/");
}

export async function login(username: string, password: string) {
  try {
    const response = await postAPI("/app/auth/login/", { username, password });
    if (response.success) {
      const cookieResponse = await setAuthToken(response.token);
      if (!cookieResponse?.success) return cookieResponse;
    }
    return response;
  } catch (e) {
    console.log("Error while logging: " + e);
    return e;
  }
}
export async function signup(username: string, password: string) {
  try {
    const response = await postAPI("/app/auth/register/", {
      username,
      password,
    });
    return response;
  } catch (e) {
    console.log("Error while signing up: " + e);
    return e;
  }
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

// TODO
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

// TODO
export async function getProductCards(): Promise<Product[]> {
  return getAPI("/products/product-list/");
}
