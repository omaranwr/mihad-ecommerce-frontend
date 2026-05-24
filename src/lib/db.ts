import type { ProductCard } from "./types";

// TODO
export async function getCategories() {
  return [
    { name: "Suits", id: 1 },
    { name: "Blouses", id: 2 },
    { name: "Shirts", id: 3 },
    { name: "Dresses", id: 4 },
    { name: "Trousers", id: 5 },
    { name: "Summer collection", id: 6 },
    { name: "Winter collection", id: 7 },
  ];
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
