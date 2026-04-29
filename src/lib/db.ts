import {
  category,
  product,
  productBaseImage,
  productFrontImage,
  productImages,
  productVariant,
} from "@/db/schema";
import { TURSO_AUTH_TOKEN, TURSO_DATABASE_URL } from "astro:env/server";
import { drizzle } from "drizzle-orm/libsql";
import { eq } from "drizzle-orm";
import type { ProductCard } from "./types";

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

export async function getProductCards(): ProductCard[] {
  const products = await db
    .select({
      name: product.productName,
    })
    .from(product)
    .leftJoin(
      productBaseImage,
      eq(product.productBaseImageId, productBaseImage.id),
    )
    .leftJoin(
      productFrontImage,
      eq(product.productFrontImageId, productFrontImage.id),
    );
  return products;
}

export async function getProductCardsByCategory(categoryId: string) {
  const products = await db
    .select()
    .from(product)
    .where(eq(product.categoryId, categoryId))
    .leftJoin(productVariant, eq(productVariant.productId, product.id))
    .leftJoin(productImages, eq(productImages.productId, product.id));
  return products;
}
