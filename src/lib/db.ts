import type { AstroCookies } from "astro";
import type {
  Cart,
  Category,
  Color,
  Product,
  ProductImage,
  Size,
} from "./types";
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
  body?: Object | null,
  init?: RequestInit,
) {
  if (!checkAuth(cookies)) throw Error("No auth cookie found.");
  return postAPI(input, body, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: "Token " + getAuthTokenCookie(cookies),
    },
  });
}
export async function deleteAPI(
  input: string,
  body?: Object | null,
  init?: RequestInit,
) {
  return fetch(import.meta.env.PUBLIC_API_URL + input, {
    ...init,
    method: "DELETE",
    body: JSON.stringify(body),
    headers: {
      ...init?.headers,
      "Content-Type": "application/json",
    },
  });
}
export async function deleteAPIWithToken(
  input: string,
  cookies: AstroCookies,
  body?: Object | null,
  init?: RequestInit,
) {
  if (!checkAuth(cookies)) throw Error("No auth cookie found.");
  return deleteAPI(input, body, {
    ...init,
    headers: {
      ...init?.headers,
      Authorization: "Token " + getAuthTokenCookie(cookies),
    },
  });
}

export async function getCategories() {
  return (await getAPI("products/category-list/")) as Category[];
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

export async function getProductCardsByCategoryId(id: number) {
  const category = await getCategoryById(id);
  if (category === null) return [];
  const { slug } = category;
  const products = (await getProductCardsByCategorySlug(
    `products/category/${slug}/`,
  )) as Product[];
  return products;
}

export async function getProductCardsByCategorySlug(slug: string) {
  const products = (await getAPI(`products/category/${slug}/`)) as Product[];
  return products;
}

export async function getProductCards() {
  const products = (await getAPI("products/product-list/")) as Product[];
  return products;
}

export async function getProduct(categorySlug: string, productSlug: string) {
  const product = (await getAPI(
    `/products/product/${categorySlug}/${productSlug}/`,
  )) as Product;
  return product;
}

export async function getProductImagesById(id: number) {
  const productImages = (await getAPI(
    `/products/${id}/images/`,
  )) as ProductImage[];
  return productImages;
}

export async function getCartData(cookies: AstroCookies) {
  const cartItems = (await getAPIWithToken("app/api/cart/", cookies)) as Cart;
  return cartItems.data;
}

export async function getColors() {
  const colors = (await getAPI("/products/color/")) as Color[];
  return colors;
}

export async function getSizes() {
  const sizes = (await getAPI("/products/size/")) as Size[];
  return sizes;
}
