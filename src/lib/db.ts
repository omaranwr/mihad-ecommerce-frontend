import { category, product, productImages, productVariant } from "@/db/schema";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";

export const db = drizzle({
  connection: {
    url: TURSO_DATABASE_URL,
    authToken: TURSO_AUTH_TOKEN,
  },
});

export async function getCategories() {
  const categories = await db.select().from(category);
  return categories;
}

export async function getCategoryById(id: number) {
  const result = await db.select().from(category).where(eq(category.id, id));
  if (result.length === 0) return null;
  return result[0];
}

export async function getProducts() {
  const products = await db
    .select()
    .from(product)
    .leftJoin(productVariant, eq(productVariant.productId, product.id))
    .leftJoin(productImages, eq(productImages.productId, product.id));
  return products;
}

export async function getProductsByCategoryId(categoryId: string) {
  const products = await db
    .select()
    .from(product)
    .where(eq(product.categoryId, categoryId))
    .leftJoin(productVariant, eq(productVariant.productId, product.id))
    .leftJoin(productImages, eq(productImages.productId, product.id));
  return products;
}
