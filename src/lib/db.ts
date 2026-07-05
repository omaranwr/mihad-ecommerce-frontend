import type { ProductCard } from "./types";

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
export async function postAPI(
  input: string,
  body?: BodyInit | null,
  init?: RequestInit,
) {
  return fetchAPI(input, {
    ...init,
    method: "POST",
    body,
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });
}

export async function getCategories(): Promise<
  Array<{ id: number; name: string }>
> {
  return await getAPI("/products/category-list/");
}

// TODO
export async function getCategoryById(id: number) {
  const categories = (await getCategories()).filter(
    (category) => category.id === id,
  );
  return categories.length !== 0 ? categories[0].name : null;
}

// TODO
export async function getProductCardsByCategoryId(
  id: number,
): Promise<ProductCard[]> {
  return [];
}

// TODO
export async function getProductCards(): Promise<ProductCard[]> {
  return [];
}
